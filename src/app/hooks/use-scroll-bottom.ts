import { useRef, useState, useCallback } from "react";

export const useScrollToBottom = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
    if (messagesEndRef.current && containerRef.current) {
      setIsScrolling(true);

      if (behavior === "auto") {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
        setIsScrolling(false);
      } else {
        messagesEndRef.current.scrollIntoView({ behavior });
        setTimeout(() => {
          setIsScrolling(false);
        }, 300);
      }
    }
  }, []);

  return { containerRef, messagesEndRef, scrollToBottom, isScrolling };
};
