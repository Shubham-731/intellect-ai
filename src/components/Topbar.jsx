import colors from "@/utils/colors";
import Image from "next/image";

const Topbar = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-4 mb-8">
      <div className="w-16 h-16 relative">
        <Image
          src="/pngs/logo-ld.png"
          fill="true"
          alt="IntellectAI logo"
          sizes=""
        />
      </div>

      <div className="">
        <h2 className={`text-xl tracking-wide font-bold`}>
          Intellect
          <span className={`text-[${colors.accent}] font-bold`}>AI</span>
        </h2>
        <p className="hidden md:block text-slate-400 text-sm">
          Empowering the future with IntellectAI: Where intelligence is
          limitless
        </p>
      </div>
    </div>
  );
};

export default Topbar;
