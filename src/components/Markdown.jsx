import { marked } from "marked";
import hljs from "highlight.js";
import { useEffect } from "react";

const Markdown = ({ content }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [content]);

  /* const renderer = new marked.Renderer();
  renderer.code = (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";

    return `
    <pre class="relative w-full">
      <div class="flex items-center justify-between gap-0 dark:bg-white/20 bg-black/20 p-2 rounded-tl-lg rounded-tr-lg">
        <div class="capitalize">${validLanguage}</div>
      </div>
      <code class="hljs ${validLanguage} w-full scrollbar-thin scrollbar-thumb-white/50 scrollbar-thumb-rounded-xl">${code}</code>
    </pre>`;
  }; */

  const html = marked(content);

  return (
    <span
      dangerouslySetInnerHTML={{ __html: html }}
      className="w-full relative"
    />
  );
};

export default Markdown;
