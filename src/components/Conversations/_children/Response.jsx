import { useEffect, useState } from "react";
import { useChat } from "@/contexts/chatContext";

const Response = ({ res }) => {
  const [displayedText, setDisplayedText] = useState("");

  const { typing, setTyping, response } = useChat();

  useEffect(() => {
    // Typing text animation
    let index = 0;
    const interval =
      typing &&
      setInterval(() => {
        setDisplayedText(response.substring(0, index));
        index++;
        if (index > response.length) {
          clearInterval(interval);
          setTyping(false);
        }
      }, 40);

    // Scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-1 relative text-sm md:text-base">
      {response == res && typing ? displayedText : res}
    </div>
  );
};

export default Response;
