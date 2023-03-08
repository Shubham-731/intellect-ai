import colors from "@/utils/colors";
import Image from "next/image";

const Spinner = () => {
  return (
    <div
      class={`w-6 h-6 rounded-full animate-spin
                    border-y-2 mx-auto border-solid border-[${colors.accent}] border-t-transparent`}
    ></div>
  );
};

export const IphoneSpinner = () => {
  return (
    <div className="relative w-5 h-5">
      <Image
        src="/gifs/iphone-spinner.gif"
        alt="Saving..."
        fill
        className="invert"
      />
    </div>
  );
};

export default Spinner;
