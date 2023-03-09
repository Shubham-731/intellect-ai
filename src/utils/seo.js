export default {
  title: "IntellectAI",
  slogan:
    "Empowering the future with IntellectAI: Where intelligence is limitless",
  description:
    "IntellectAI is a cutting-edge artificial intelligence company that aims to revolutionize the way we interact with technology. We design and develop AI systems that can learn, adapt and evolve, bringing next-generation intelligence to businesses and organizations. With a focus on delivering exceptional user experiences, our innovative solutions are designed to help our clients achieve their goals faster, smarter and more efficiently. Whether it's automating tedious tasks, providing real-time insights, or enabling new forms of interaction, IntellectAI is at the forefront of the AI revolution, delivering limitless intelligence for a smarter world.",
  keywords: [
    "Aritificial Intelligence",
    "AI solutions",
    "AI company",
    "AI development",
    "AI technology",
    "AI systems",
    "Intelligent automation",
    "Machine learning",
    "Next-generation AI",
    "Intelligent software",
    "AI-powered solutions",
    "AI for business",
    "AI for organization",
    "AI innovation",
    "AI revolution",
  ],
  data: `(
    <CopyToClipboard text={code} onCopy={handleCopy}>
      <button class="flex items-center gap-1 dark:text-white/80 text-black/80">
        <span>
          {!copied
            ? <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>
            : <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>}
        </span>

        <span>{copied ? "Copied!" : "Copy Code"}</span>
      </button>
    </CopyToClipboard>
  )`,
};
