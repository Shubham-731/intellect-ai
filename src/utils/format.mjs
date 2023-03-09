import { marked } from "marked";
import hljs from "highlight.js";

// Format user data
const formatAuthUser = (user) => ({
  uid: user.uid,
  fullName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  photoUrl: user.photoUrl,
});

// Format firebase messages
const formatFbAuthCode = (code) => {
  if (code) {
    const removedPrefix = code.replace("auth/", "");
    const removedHyphen = removedPrefix.replaceAll("-", " ");
    const capitalised =
      removedHyphen.replace(removedHyphen[0], removedHyphen[0].toUpperCase()) +
      "!";

    return capitalised;
  }
};

// Format OpenAI response
const formatContent = (text, theme) => {
  const renderer = new marked.Renderer();

  renderer.code = function (code, language) {
    const highlightedCode = hljs.highlightAuto(code, [language]).value;
    const languageClass = language ? `language-${language}` : "";
    return `
    <pre style="${
      theme === "dark" ? "background-color: black;" : "background-color: white;"
    } border-radius: 1rem;" class="px-4">
      <code class="${languageClass}">
        ${highlightedCode}
      </code>
    </pre>
  `;
  };

  const html = marked(text);

  return html;
};

export { formatAuthUser, formatFbAuthCode, formatContent };
