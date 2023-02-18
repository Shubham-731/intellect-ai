import colors from "@/utils/colors";
import Image from "next/image";
import Link from "next/link";
import Message from "./_children/Msg";
import { useAuth } from "@/contexts/authContext";
import { useTheme } from "@/contexts/themeContext";
import { useChat } from "@/contexts/chatContext";
import uuid from "react-uuid";

const Sidebar = ({ open, setOpen }) => {
  const { logout } = useAuth();
  const { theme, handleThemeChange } = useTheme();

  const { messages, setChats, clearChats } = useChat();

  return (
    <>
      {/* Mobile */}
      <div className={``}>
        {/* Backdrop */}
        <div
          className={`${
            open &&
            "w-screen h-screen z-20 backdrop-opacity-50 bg-black/50 absolute inset-0 md:hidden"
          }`}
        />

        {/* Sidebar */}
        <div
          className={`z-40 fixed md:relative transition-all md:min-w-max duration-700 flex ${
            open ? "inset-0" : "-left-[200%] md:left-0 top-0"
          }`}
        >
          <nav
            className={`max-w-xs md:w-[16rem] bg-[${colors.accent}] w-full h-screen text-white relative`}
          >
            <div className="absolute top-0 right-0 -mr-10 pt-2 md:hidden">
              <button
                className="relative w-6 h-6 invert"
                onClick={() => setOpen(false)}
              >
                <Image
                  src={"/svgs/close.svg"}
                  alt="Close sidebar"
                  fill={true}
                />
              </button>
            </div>

            <div className="flex flex-col justify-between relative h-full">
              {/* New chat */}
              <button
                className="rounded transition h-fit hidden md:block"
                onClick={() => setChats([])}
              >
                <Link href={"/chat"}>
                  <div className="flex items-center m-2 hover:bg-white/10 gap-2 p-3 border border-solid border-white/80 rounded">
                    <div className="relative w-4 h-4 invert">
                      <Image
                        src={"/svgs/plus.svg"}
                        alt="New chat"
                        fill={true}
                      />
                    </div>
                    <p className="text-sm">New Chat</p>
                  </div>
                </Link>
              </button>

              {/* Chats */}
              <div className="p-2 h-full relative pt-0 pr-0 flex gap-1 flex-col md:overflow-y-hidden md:hover:overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/60 scrollbar-thumb-rounded-xl scroll-p-0 scroll-smooth shadow-inner">
                {messages.length ? (
                  messages.map((msg) => (
                    <Message
                      link={`/chat/${msg.id}`}
                      msg={msg.chatTitle}
                      key={uuid()}
                    />
                  ))
                ) : (
                  <p className="text-white/80 my-2 mx-1">
                    No conversations yet
                  </p>
                )}

                {/* <button className="mx-auto w-fit py-2 px-3 rounded border-2 border-white/50 text-sm hover:bg-white/10 transition-all">
                  Show More
                </button> */}
              </div>

              {/* Settings */}
              <div
                className={`border-t w-full h-fit p-2 border-solid border-white/50`}
              >
                <button
                  onClick={clearChats}
                  className={`flex items-center gap-2 p-3 rounded  w-full hover:bg-white/10 transition ${
                    !messages.length && "pointer-events-none"
                  }`}
                >
                  <div className="relative w-4 h-4 invert">
                    <Image
                      src={"/svgs/trash.svg"}
                      alt="Clear conversations"
                      fill={true}
                    />
                  </div>
                  <span className="text-left text-sm">Clear conversations</span>
                </button>

                <button
                  onClick={() =>
                    handleThemeChange(theme === "light" ? "dark" : "light")
                  }
                  className="flex items-center gap-2 p-3 rounded w-full hover:bg-white/10 transition"
                >
                  <div className="relative w-4 h-4 invert">
                    <Image
                      src={
                        theme === "light" ? "/svgs/moon.svg" : "/svgs/light.svg"
                      }
                      alt="Dark mode"
                      fill={true}
                    />
                  </div>
                  <p className="text-sm capitalize">
                    {theme === "light" ? "dark" : "light"} mode
                  </p>
                </button>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 p-3 hover:bg-white/10 rounded transition w-full "
                >
                  <div className="relative w-4 h-4 invert">
                    <Image
                      src={"/svgs/arrow-right.svg"}
                      alt="Logout"
                      fill={true}
                    />
                  </div>
                  <p className="text-sm">Log out</p>
                </button>
              </div>
            </div>
          </nav>

          {/* Close sidebar btn */}
          <div className="w-14 flex-shrink-0 md:hidden" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
