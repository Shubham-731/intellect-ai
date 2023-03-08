import colors from "@/utils/colors";
import ChatComp from "@/components/ChatComp";
import { useChat } from "@/contexts/chatContext";
import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/authContext";
import Prompt from "@/components/Prompt";
import { useRouter } from "next/router";

const ChatHome = () => {
  const { chats } = useChat();
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const bottomRef = useRef(null);

  function scrollToBottom() {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

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

  return (
    <div
      className={`dark:bg-[${colors.secondary_dark}] bg-white/80 w-full h-screen relative`}
    >
      <Prompt />

      {/* Chats container */}
      <div className="max-h-screen scrollbar-thin scrollbar-thumb-black/50 dark:scrollbar-thumb-white/50 scrollbar-thumb-rounded-xl">
        <div className="w-full h-14 md:h-0 flex-shrink-0" />

        {/* Chats */}
        {chats.map((chat, index) => (
          <ChatComp
            chat={chat}
            index={index}
            length={chats.length}
            key={index}
          />
        ))}

        <div className="w-full h-16 md:h-20 flex-shrink-0" ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatHome;
