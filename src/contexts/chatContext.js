import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./authContext";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

// Create context
const chatContext = createContext({
  messages: [],
  chats: [],
  doneStreaming: true,
  chatTitle: null,
  saving: false,
  setChatId: () => {},
  handlePrompt: async () => {},
  setMsgRefKey: () => {},
  clearChats: () => {},
  resetChat: () => {},
});

// Create context provider
function ChatContextProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [msgRefKey, setMsgRefKey] = useState(0);
  const [chats, setChats] = useState([]);
  const [doneStreaming, setDoneStreaming] = useState(true);
  const [chatId, setChatId] = useState(null);
  const [chatTitle, setChatTitle] = useState(null);
  const [saving, setSaving] = useState(false);

  const { authUser } = useAuth();
  const router = useRouter();

  // Get msg snapshots
  const getMsgSnap = async (userId) => {
    try {
      const msgQuery = query(
        collection(db, "Chats"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const msgSnap = await getDocs(msgQuery);
      return msgSnap;
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Update assistant response to chunk value
  const updateAssRes = (chunkValue) => {
    setChats((prevChats) => {
      const lastChat = prevChats.at(-1);
      return [
        ...prevChats.slice(0, -1),
        { ...lastChat, content: lastChat.content + chunkValue },
      ];
    });
  };

  // Get response from OpenAI
  const getRes = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chats }),
      });

      if (!response.ok) {
        toast.error(response.statusText);
        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        updateAssRes(chunkValue);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      updateAssRes(error.message);
    } finally {
      setDoneStreaming(true);
      setChatTitle(chats[0]["content"]);
      setSaving(true);
    }
  };

  // Persist chats to database
  const persistChats = async () => {
    try {
      if (!chatId) {
        // Create a new chat document in firebase
        const uniqueId = uuidv4();
        await setDoc(doc(db, "Chats", uniqueId), {
          chats,
          chatTitle,
          userId: authUser.uid,
          createdAt: serverTimestamp(),
        });

        // Set the new `chatId`and refresh messages
        setChatId(uniqueId);
        setMsgRefKey(Math.random());
      } else if (chatId) {
        // Update the firebase Chat doc with `chatId`
        const chatRef = doc(db, "Chats", chatId);
        await updateDoc(chatRef, {
          chats,
        });
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const handlePrompt = async (prompt) => {
    const updatedUserChat = [
      ...chats,
      { role: "user", content: prompt },
      { role: "assistant", content: "" },
    ];
    setChats(updatedUserChat);
    setDoneStreaming(false);
  };

  const clearChats = async () => {
    try {
      if (authUser?.uid) {
        const msgSnap = await getMsgSnap(authUser?.uid);
        msgSnap.forEach((msg) => {
          deleteDoc(msg.ref);
        });
      }

      setMsgRefKey(Math.random());
      toast.info("Chats cleared!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Reset chats on route change
  const resetChat = () => {
    setChatId(null);
    setChats([]);
    setChatTitle(null);
  };

  // Get msgs on page load and refresh key
  useEffect(() => {
    const getMessages = async () => {
      try {
        if (authUser?.uid) {
          const msgSnap = await getMsgSnap(authUser?.uid);

          // Set messages
          let msgs = [];
          msgSnap.docs.map((msg) => {
            msgs.push({
              chatTitle: msg.data().chatTitle,
              id: msg.id,
            });
          });

          setMessages(msgs);
        }
      } catch (error) {
        toast.error("Internal server error!");
        console.log(error);
      }
    };

    getMessages();
  }, [msgRefKey, authUser]);

  // Set chats if chatId != null
  useEffect(() => {
    const getChats = async () => {
      try {
        const chatsRef = doc(db, "Chats", chatId);
        const chatSnap = await getDoc(chatsRef);

        if (chatSnap.exists()) {
          setChats(chatSnap.data().chats);
          setChatTitle(chatSnap.data().chatTitle);
        } else {
          router.push("/chat");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
      }
    };

    if (chatId) {
      getChats();
    }
  }, [chatId]);

  useEffect(() => {
    if (!doneStreaming) {
      getRes();
    }
  }, [doneStreaming]);

  useEffect(() => {
    if (doneStreaming && saving) {
      persistChats();
    }
  }, [saving]);

  return (
    <chatContext.Provider
      value={{
        messages,
        setMsgRefKey,
        chats,
        handlePrompt,
        doneStreaming,
        saving,
        setChatId,
        chatTitle,
        clearChats,
        resetChat,
      }}
    >
      {children}
    </chatContext.Provider>
  );
}

// Export context provider and useContext
export default ChatContextProvider;
export const useChat = () => useContext(chatContext);
