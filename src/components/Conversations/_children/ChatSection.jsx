import Image from "next/image";
import Response from "./Response";
import { useAuth } from "@/contexts/authContext";

const ChatSection = ({ userMsg, botMsg }) => {
  const { authUser } = useAuth();

  return (
    <div className="">
      {/* User */}
      <div className="flex gap-4 p-4 sm:px-0 max-w-3xl mx-auto">
        {/* User icon */}
        <div className="px-2 py-1 rounded h-fit dark:bg-white/20 bg-black/20">
          <span className="text-xs text-black/70 dark:text-white/70 uppercase">
            {authUser?.fullName.slice(0, 2)}
          </span>
        </div>

        {/* User prompt */}
        <div className="pt-1">
          <p className="dark:text-white/80 text-black/80 text-sm md:text-base">
            {userMsg}
          </p>
        </div>
      </div>

      {/* IntellectAI */}
      <div className="dark:bg-white/5 bg-black/5">
        <div className="py-4 px-3 sm:px-0 w-full flex gap-4 max-w-3xl mx-auto">
          <div className="pl-1">
            <div className="w-7 h-7 relative invert dark:invert-0">
              <Image src={"/svgs/bot.svg"} alt="IntellectAI" fill={true} />
            </div>
          </div>

          <Response res={botMsg} />
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
