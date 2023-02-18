import { useChat } from "@/contexts/chatContext";
import { useFormik } from "formik";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import uuid from "react-uuid";
import Prompt from "../Prompt";
import ChatSection from "./_children/ChatSection";

const ChatComp = ({ chatId }) => {
  const { chats, handleChat, setChatId } = useChat();
  console.log(chats);
  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    onSubmit: (values, actions) => {
      handleChat(values.prompt);
    },
  });

  // Get chats by chatId
  useEffect(() => {
    if (chatId) {
      setChatId(chatId);
    }
  }, [chatId]);

  return (
    <>
      <NextSeo title="Chat | IntellectAI" />

      <div className="relative w-full h-screen">
        <Prompt formik={formik} />

        <div className="max-h-screen scrollbar-thin scrollbar-thumb-black/50 dark:scrollbar-thumb-white/50 scrollbar-thumb-rounded-xl">
          <div className="w-full h-14 md:h-0 flex-shrink-0" />

          {chats.map((chat) => (
            <ChatSection
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

export default ChatComp;
