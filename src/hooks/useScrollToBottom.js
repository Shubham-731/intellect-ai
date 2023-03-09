import { useEffect } from "react";

function useScrollToBottom(ref) {
  const scrollToBottom = () => {
    ref.current.scrollTop = ref.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return scrollToBottom;
}

export default useScrollToBottom;
