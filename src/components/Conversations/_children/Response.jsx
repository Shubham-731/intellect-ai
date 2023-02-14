import { useEffect, useState } from "react";

const Response = ({ res, typed, setTyped }) => {
  /*  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (typed) {
        setText(res);
      }

      if (text.length === res.length) {
        setTyped(true);
        clearInterval(interval);
      } else {
        setText(res.slice(0, text.length + 1));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]); */

  return (
    <div>
      <div className="dark:text-white/80 text-black/80">{res}</div>
    </div>
  );
};

export default Response;
