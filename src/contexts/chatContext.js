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
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "./authContext";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const chatContext = createContext({
  chatTitle: "New Chat",
  chats: [],
  messages: [],
  setChatId: () => {},
  setChats: () => {},
  resetChat: () => {},
  handleChat: async (prompt) => {},
});

function ChatContextProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [chatTitle, setChatTitle] = useState("New chat");
  const [messages, setMessages] = useState([]);

  const { authUser } = useAuth();
  const router = useRouter();

  // Set chats if chatId != null
  useEffect(() => {
    const getChats = async () => {
      const chatsRef = doc(db, "Chats", chatId);
      const chatSnap = await getDoc(chatsRef);

      if (chatSnap.exists()) {
        setChats(chatSnap.data().chats);
        setChatTitle(chatSnap.data().chatTitle);
      } else {
        toast.error("Chats not found!");
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
        const chatsColl = collection(db, "Chats");
        if (authUser?.uid) {
          const msgQuery = query(
            chatsColl,
            where("userId", "==", authUser?.uid)
          );
          const msgSnap = await getDocs(msgQuery);

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
      // Set user recent prompt
      const promptsArr = prompt.split("\n");
      const userPrompt = promptsArr.at(-1);

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

        // Update the `chat` state
        setChats([...chats, { userPrompt, botRes }]);

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

  return (
    <chatContext.Provider
      value={{
        chats,
        setChats,
        handleChat,
        setChatId,
        chatTitle,
        messages,
        resetChat,
      }}
    >
      {children}
    </chatContext.Provider>
  );
}

export default ChatContextProvider;
export const useChat = () => useContext(chatContext);
