import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authContext";
import { useEffect } from "react";
import ChatComp from "@/components/Conversations/_children/ChatSection";
import { useFormik } from "formik";
import ChatContextProvider, { useChat } from "@/contexts/chatContext";
import Prompt from "@/components/Prompt";
import uuid from "react-uuid";

const Chat = () => {
  const { authUser, loading } = useAuth();
  const { chats, handleChat, setChatId } = useChat();

  const router = useRouter();
  const { chat_id: chatId } = router.query;

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading) {
      if (!authUser) {
        router.push(`/auth/signin`);
      } else if (!authUser.emailVerified) {
        router.push("/auth/verify-email");
      }
    }
  }, [authUser, loading]);

  // Get chats by chatId
  useEffect(() => {
    if (chatId) {
      setChatId(chatId);
    }
  }, [chatId]);

  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    onSubmit: (values, actions) => {
      handleChat(values.prompt);
    },
  });

  return (
    <>
      <NextSeo title="Chat | IntellectAI" />

      <div className="relative w-full h-screen">
        <Prompt formik={formik} />

        <div className="max-h-screen scrollbar-thin scrollbar-thumb-black/50 dark:scrollbar-thumb-white/50 scrollbar-thumb-rounded-xl">
          <div className="w-full h-14 md:h-0 flex-shrink-0" />

          {chats.map((chat) => (
            <ChatComp
              botMsg={chat.botRes}
              userMsg={chat.userPrompt}
              key={uuid()}
            />
          ))}

          <div className="w-full h-32 md:h-40 flex-shrink-0" />
        </div>
      </div>
    </>
  );
};

export default Chat;
