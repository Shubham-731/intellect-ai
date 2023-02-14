import colors from "@/utils/colors";
import Image from "next/image";
import seo from "@/utils/seo";

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
        <p className="hidden md:block text-black/80 dark:text-white/80 text-sm">
          {seo.slogan}
        </p>
      </div>
    </div>
  );
};

export default Topbar;
