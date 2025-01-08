import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { messagesAtom } from "@/jotai/atoms";
import SocketManager from "@/socket/socket-manager";
import { Message } from "@/types/message";

export const useChat = () => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const socket = useMemo(() => SocketManager.getInstance("http://localhost:3001"), []);

  useEffect(() => {
    const handleNewMessage = (messageData: Message) => {
      setMessages((prev) => [...prev, messageData]);
    };

    socket.subscribe("new_message", handleNewMessage);
    return () => socket.unsubscribe("new_message", handleNewMessage);
  }, [socket, setMessages]);

  const sendMessage = (content: string) => {
    socket.send("send_message", { content });
  };

  return { messages, sendMessage };
};
