import { useFormik } from "formik";
import { useChat } from "@/contexts/chatContext";
import colors from "@/utils/colors";

const Prompt = ({}) => {
  const { handlePrompt } = useChat();

  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    onSubmit: (values, actions) => {
      handlePrompt(values.prompt);
      actions.resetForm();
    },
  });

  return (
    <div className="w-full bottom-0 left-0 z-10 right-0 absolute p-2 sm:p-3 dark:bg-[#202123] border-t border-gray-300 dark:border-gray-500 md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white md:!bg-transparent dark:md:bg-vert-dark-gradient">
      <form
        className={`flex md:max-w-3xl m-auto items-center gap-2 dark:bg-[${colors.text_primary}] px-3 py-2 md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]`}
        onSubmit={formik.handleSubmit}
      >
        <input
          type="text"
          placeholder="Prompt..."
          name="prompt"
          value={formik.values.prompt}
          onChange={formik.handleChange}
          className="flex-grow bg-transparent outline-none dark:text-white/80 text-black/80"
          autoComplete="off"
        />
        <button type="submit">
          <img
            src="/svgs/send.svg"
            alt="Enter"
            className="w-4 h-4 dark:invert opacity-75"
          />
        </button>
      </form>
    </div>
  );
};

export default Prompt;
