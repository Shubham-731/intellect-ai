import { NextSeo } from "next-seo";
import Prompt from "@/components/Prompt";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import ChatSection from "@/components/Conversations/_children/ChatSection";
import { useFormik } from "formik";
import { useChat } from "@/contexts/chatContext";
import uuid from "react-uuid";

const ChatHome = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  const { chats, handleChat, resetChat } = useChat();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading) {
      if (!authUser) {
        router.push(`/auth/signin`);
      } else if (!authUser.emailVerified) {
        router.push("/auth/verify-email");
      } else if (authUser) {
        router.push("/chat");
      }
    }
  }, [authUser, loading]);

  // Reset chat on page load
  useEffect(() => resetChat(), []);

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
      <NextSeo title="New chat | IntellectAI" />

      <div className="relative w-full h-screen dark:bg-[#343540]">
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

export default ChatHome;
