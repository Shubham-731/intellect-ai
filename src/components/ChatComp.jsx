import { useAuth } from "@/contexts/authContext";
import { useChat } from "@/contexts/chatContext";
import Image from "next/image";
import Markdown from "./Markdown";

const ChatComp = ({ chat, index, length }) => {
  const { authUser } = useAuth();
  const { doneStreaming } = useChat();
  return (
    <div
      className={`${
        chat.role === "assistant" && "dark:bg-white/5 bg-black/5"
      } w-full relative`}
      key={index}
    >
      <div
        className={`flex gap-4 p-4 sm:px-2 md:px-3 max-w-3xl mx-auto w-full relative`}
      >
        {chat.role === "user" ? (
          <div className="px-2 py-1 rounded h-fit dark:bg-white/20 bg-black/20">
            <span className="text-xs text-black/70 dark:text-white/70 uppercase">
              {authUser?.fullName.slice(0, 2)}
            </span>
          </div>
        ) : (
          <div className="pl-1">
            <div className="w-7 h-7 relative invert dark:invert-0">
              <Image src={"/svgs/bot.svg"} alt="IntellectAI" fill={true} />
            </div>
          </div>
        )}

        <div className="pt-1.5 md:pt-1 relative w-full">
          <span
            className={`markdown dark:text-white/80 text-black/80 text-sm relative w-full md:text-base ${
              chat.content && "mr-1"
            }`}
          >
            <Markdown content={chat.content} />
          </span>

          {chat.role === "assistant" &&
            length === index + 1 &&
            !doneStreaming && (
              <span className="border-r-8 dark:border-white/80 border-black/80 animate-pulse" />
            )}
        </div>
      </div>
    </div>
  );
};

export default ChatComp;
