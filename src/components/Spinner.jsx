import colors from "@/utils/colors";

const Spinner = () => {
  return (
    <div
      class={`w-6 h-6 rounded-full animate-spin
                    border-y-2 mx-auto border-solid border-[${colors.accent}] border-t-transparent`}
    ></div>
  );
};
export default Spinner;
