import { useEffect, useState } from "react";
import { useChat } from "@/contexts/chatContext";

const Response = ({ res }) => {
  const [displayedText, setDisplayedText] = useState("");

  const { typing, setTyping, response } = useChat();

  useEffect(() => {
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

    return () => clearInterval(interval);
  }, [response]);

  return (
    <div className="pt-1 relative">
      {response == res && typing ? displayedText : res}
    </div>
  );
};

export default Response;
