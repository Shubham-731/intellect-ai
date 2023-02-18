import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  setDoc,
  doc,
  arrayUnion,
  updateDoc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "./authContext";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const chatContext = createContext({
  chatTitle: "New Chat",
  typing: false,
  chats: [],
  messages: [],
  response: "",
  setTyping: () => {},
  setChatId: () => {},
  setChats: () => {},
  resetChat: () => {},
  handleChat: async (prompt) => {},
  clearChats: async () => {},
});

function ChatContextProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [chatTitle, setChatTitle] = useState("New chat");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [response, setResponse] = useState("");

  const { authUser } = useAuth();
  const router = useRouter();

  const chatsColl = collection(db, "Chats");
  console.log("loop");

  // Get msg snapshots
  const getMsgSnap = async (userId) => {
    try {
      const msgQuery = query(
        chatsColl,
        where("userId", "==", userId)
        // orderBy("timestamp", "desc")
      );
      const msgSnap = await getDocs(msgQuery);
      return msgSnap;
    } catch (error) {
      toast.error("Internal server error!");
      console.log(error);
    }
  };

  // Set chats if chatId != null
  useEffect(() => {
    const getChats = async () => {
      const chatsRef = doc(db, "Chats", chatId);
      const chatSnap = await getDoc(chatsRef);

      if (chatSnap.exists()) {
        setChats(chatSnap.data().chats);
        setChatTitle(chatSnap.data().chatTitle);
      } else {
        router.push("/chat");
      }
    };

    if (chatId) {
      getChats();
    }
  }, [chatId]);

  // Get messages
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
  }, [authUser]);

  // Handle Chats
  const handleChat = async (prompt) => {
    try {
      // Get user recent prompt
      const promptsArr = prompt.split("\n");
      const userPrompt = promptsArr.at(-1);

      // Set user recent prompt
      setChats([...chats, { userPrompt, botRes: "" }]);

      // Get response from openai
      const res = await axios.post(
        "/api/chat",
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        const botRes = res.data.response;

        // Set botRes and start typing text animation
        setResponse(botRes);
        setTyping(true);

        // Update the `chat` state
        setChats((prevChats) => {
          const lastChat = prevChats.at(-1);
          const updatedRes = { ...lastChat, botRes };
          return [...prevChats.slice(0, -1), updatedRes];
        });

        if (!chatId) {
          // Create a new chat document in firebase
          const uniqueId = uuidv4();
          await setDoc(doc(db, "Chats", uniqueId), {
            chats: [
              {
                userPrompt,
                botRes,
                media: "text",
              },
            ],
            chatTitle: userPrompt,
            userId: authUser.uid,
          });

          // Set the new `chatId` and `chatTitle`
          setChatId(uniqueId);
          setChatTitle(userPrompt);
        } else if (chatId) {
          // Update the firebase Chat doc with `chatId`
          const chatRef = doc(db, "Chats", chatId);
          await updateDoc(chatRef, {
            chats: arrayUnion({ userPrompt, botRes, media: "text" }),
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Reset chats on route change
  const resetChat = () => {
    setChatId(null);
    setChats([]);
    setChatTitle("New chat");
  };

  // Clear chats
  const clearChats = async () => {
    try {
      if (authUser?.uid) {
        const msgSnap = await getMsgSnap(authUser?.uid);
        msgSnap.forEach((msg) => {
          deleteDoc(msg.ref);
        });
      }

      toast.info("Chats cleared!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const contextValues = {
    chats,
    typing,
    setTyping,
    setChats,
    response,
    handleChat,
    setChatId,
    chatTitle,
    messages,
    resetChat,
    clearChats,
  };

  return (
    <chatContext.Provider value={contextValues}>
      {children}
    </chatContext.Provider>
  );
}

export default ChatContextProvider;
export const useChat = () => useContext(chatContext);
