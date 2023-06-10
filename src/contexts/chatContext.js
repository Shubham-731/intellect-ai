import { db } from "@/firebase"
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
} from "firebase/firestore"
import {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from "react"
import { toast } from "react-toastify"
import { useAuth } from "./authContext"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/router"

function reducer(state, action) {
  switch (action.name) {
    case "set_messages":
      return {
        ...state,
        messages: action.value,
      }

    case "handle_chat_prompt":
      return {
        ...state,
        chats: action.updatedChats,
        doneStreaming: action.doneStreaming,
      }

    case "reset_chats":
      return {
        ...state,
        chats: [],
        chatTitle: null,
      }

    case "set_initial_chat_content":
      return {
        ...state,
        chats: action.initialChats,
        chatTitle: action.chatTitle,
      }

    case "set_chat_response":
      const lastChat = state["chats"].at(-1)
      return {
        ...state,
        chats: [
          ...state["chats"].slice(0, -1),
          { ...lastChat, content: lastChat.content + action.chunkValue },
        ],
      }

    case "set_final_response":
      return {
        ...state,
        doneStreaming: true,
        chatTitle: state["chats"][0]["content"],
        saving: true,
      }

    case "chats_saved":
      return {
        ...state,
        saving: false,
      }

    default:
      throw new Error("Unknown action:", action.name)
  }
}

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
})

// Create context provider
function ChatContextProvider({ children }) {
  const [msgRefKey, setMsgRefKey] = useState(0)
  const [chatId, setChatId] = useState(null)

  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    chats: [],
    doneStreaming: true,
    chatTitle: null,
    saving: false,
  })

  const { authUser } = useAuth()
  const router = useRouter()

  // Get msg snapshots
  const getMsgSnap = async (userId) => {
    try {
      const msgQuery = query(
        collection(db, "Chats"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      )
      const msgSnap = await getDocs(msgQuery)
      return msgSnap
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  // Update assistant response to chunk value
  const updateAssRes = (chunkValue) => {
    dispatch({ name: "set_chat_response", chunkValue })
  }

  // Get response from OpenAI
  const getRes = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chats: state["chats"] }),
      })

      if (!response.ok) {
        toast.error(response.statusText)
        throw new Error(response.statusText)
      }

      // This data is a ReadableStream
      const data = response.body
      if (!data) {
        return
      }

      const reader = data.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)

        updateAssRes(chunkValue)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      updateAssRes(error.message)
    } finally {
      // Final response
      dispatch({ name: "set_final_response" })
    }
  }

  // Persist chats to database
  const persistChats = async () => {
    try {
      if (!chatId) {
        // Create a new chat document in firebase
        const uniqueId = uuidv4()
        await setDoc(doc(db, "Chats", uniqueId), {
          chats: state["chats"],
          chatTitle: state["chatTitle"],
          userId: authUser.uid,
          createdAt: serverTimestamp(),
        })

        // Set the new `chatId`and refresh messages
        setChatId(uniqueId)
        setMsgRefKey(Math.random())
      } else if (chatId) {
        // Update the firebase Chat doc with `chatId`
        const chatRef = doc(db, "Chats", chatId)
        await updateDoc(chatRef, {
          chats: state["chats"],
        })
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      dispatch({ name: "chats_saved" })
    }
  }

  const handlePrompt = async (prompt) => {
    const updatedUserChat = [
      ...state["chats"],
      { role: "user", content: prompt },
      { role: "assistant", content: "" },
    ]

    // Handle chat prompt
    dispatch({
      name: "handle_chat_prompt",
      updatedChats: updatedUserChat,
      doneStreaming: false,
    })
  }

  const clearChats = async () => {
    try {
      if (authUser?.uid) {
        const msgSnap = await getMsgSnap(authUser?.uid)
        msgSnap.forEach((msg) => {
          deleteDoc(msg.ref)
        })
      }

      setMsgRefKey(Math.random())
      toast.info("Chats cleared!")
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Reset chats on route change
  const resetChat = () => {
    setChatId(null)

    dispatch({ name: "reset_chats" })
  }

  // Get msgs on page load and refresh key
  useEffect(() => {
    const getMessages = async () => {
      try {
        if (authUser?.uid) {
          const msgSnap = await getMsgSnap(authUser?.uid)

          // Set messages
          let msgs = []
          msgSnap.docs.map((msg) => {
            msgs.push({
              chatTitle: msg.data().chatTitle,
              id: msg.id,
            })
          })

          dispatch({ name: "set_messages", value: msgs })
        }
      } catch (error) {
        toast.error("Internal server error!")
        console.log(error)
      }
    }

    getMessages()
  }, [msgRefKey, authUser])

  // Set chats if chatId != null
  useEffect(() => {
    const getChats = async () => {
      try {
        const chatsRef = doc(db, "Chats", chatId)
        const chatSnap = await getDoc(chatsRef)

        if (chatSnap.exists()) {
          // Set initial chat content
          dispatch({
            name: "set_initial_chat_content",
            initialChats: chatSnap.data().chats,
            chatTitle: chatSnap.data().chatTitle,
          })
        } else {
          router.push("/chat")
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      } finally {
      }
    }

    if (chatId) {
      getChats()
    }
  }, [chatId])

  useEffect(() => {
    if (!state["doneStreaming"]) {
      getRes()
    }
  }, [state["doneStreaming"]])

  useEffect(() => {
    if (state["doneStreaming"] && state["saving"]) {
      persistChats()
    }
  }, [state["saving"]])

  return (
    <chatContext.Provider
      value={{
        ...state,
        setMsgRefKey,
        handlePrompt,
        setChatId,
        clearChats,
        resetChat,
      }}
    >
      {children}
    </chatContext.Provider>
  )
}

// Export context provider and useContext
export default ChatContextProvider
export const useChat = () => useContext(chatContext)
