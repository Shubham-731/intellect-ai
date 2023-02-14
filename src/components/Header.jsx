import Image from "next/image";
import Sidebar from "./Sidebar/Sidebar";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed right-0 top-0 left-0 z-20 md:relative">
      <div
        className={`flex items-center text-white z-10 sticky inset-0 justify-between w-full sm:p-3 px-2 py-3 bg-[#343540] dark:bg-[#202123] md:hidden`}
      >
        <button
          className="relative w-6 h-6 invert"
          onClick={() => setOpen(true)}
        >
          <Image src={"/svgs/bars.svg"} fill={true} alt="Open menu" />
        </button>

        <div className="max-w-[10rem] sm:max-w-[16rem]">
          <p className="truncate text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
        </div>

        <button className="relative w-6 h-6 invert">
          <Image src={"/svgs/plus.svg"} fill={true} alt="New chat" />
        </button>
      </div>

      <Sidebar open={open} setOpen={setOpen} />
    </header>
  );
};

export default Header;
