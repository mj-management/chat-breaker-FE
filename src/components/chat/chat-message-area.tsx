"use client";

import { useEffect, useState, useCallback } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { useScrollToBottom } from "@/app/hooks/use-scroll-bottom";
import { useMessageInput } from "@/app/hooks/use-message-input";
import { useChat } from "@/app/hooks/use-chat";
import { Message } from "@/types/message";
import ChatMessage from "./chat-message";
import NewMessageAlert from "./new-message-alert";
import MessageInput from "./message-input";

export default function ChatMessageArea() {
  const { containerRef, messagesEndRef, scrollToBottom } = useScrollToBottom();
  const { messages, sendMessage } = useChat();
  const { input, inputLength, clearInput, handleInputChange } = useMessageInput();
  const [newMessage, setNewMessage] = useState<Message | null>(null);

  const isNearBottom = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      return container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    }
    return false;
  }, [containerRef]);

  useEffect(() => {
    if (messages.length === 0) return;

    const shouldScroll = isNearBottom();
    if (shouldScroll) {
      scrollToBottom("auto");
      setNewMessage(null);
    } else {
      setNewMessage(messages[messages.length - 1]);
    }
  }, [messages, scrollToBottom, isNearBottom]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputLength === 0) return;
    sendMessage(input);
    clearInput();
  };

  return (
    <>
      <CardContent className="flex-1 overflow-y-auto p-4" ref={containerRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="shrink-0 w-full px-2 py-2 border-t relative">
        {newMessage && (
          <NewMessageAlert
            message={newMessage}
            onView={() => {
              scrollToBottom("smooth");
              setNewMessage(null);
            }}
          />
        )}
        <MessageInput
          input={input}
          inputLength={inputLength}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </CardFooter>
    </>
  );
}
