import Image from "next/image";

const Prompt = ({ formik }) => {
  return (
    <div className="absolute z-10 bottom-0 left-0 right-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient">
      <form
        onSubmit={formik.handleSubmit}
        className="stretch mx-2 flex flex-col gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6"
      >
        {/* <div className="w-full hidden md:block">
          <button className="p-2 bg-black/10 hover:dark:bg-black/10 hover:bg-white/10 transition-all dark:bg-white/10 rounded h-full w-fit mx-auto flex items-center justify-center space-x-2 text-sm">
            <div className="w-5 h-5 relative dark:invert">
              <Image src="/svgs/arrow-path.svg" alt="Regenerate" fill="true" />
            </div>
            <span>Regenerate response</span>
          </button>
        </div> */}
        <div className="relative flex h-full flex-1 md:flex-col">
          <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
            <textarea
              type={"text"}
              tabIndex="0"
              data-id="root"
              rows="1"
              placeholder="Hi there!"
              style={{
                overflowY: "hidden",
                maxHeight: "200px",
              }}
              value={formik.values.prompt}
              onChange={formik.handleChange}
              name="prompt"
              id="prompt"
              className="m-0 w-full text-black/80 dark:text-white/80 resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0 outline-none scrollbar-thin h-6"
            />
            <button
              type="submit"
              className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-1"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <div className="flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center items-center relative">
            <button className="p-2 bg-black/10 hover:dark:bg-black/10 hover:bg-white/10 transition-all md:hidden dark:bg-white/10 rounded h-full flex items-center justify-center">
              <div className="w-5 h-5 relative dark:invert">
                <Image
                  src="/svgs/arrow-path.svg"
                  alt="Regenerate"
                  fill="true"
                />
              </div>
            </button>
          </div>
        </div>
      </form>
      <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
        <span className="font-semibold">IntellectAI</span> - Free Research
        Preview. Our goal is to make AI systems more natural and safe to
        interact with. Your feedback will help us improve.
      </div>
    </div>
  );
};

export default Prompt;
