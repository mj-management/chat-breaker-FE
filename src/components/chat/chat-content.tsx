"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { inputAtom, lastMessageAtom, messagesAtom, showNewMessageAtom } from "@/jotai/atoms";
import { useScrollToBottom } from "@/app/hooks/use-scroll-bottom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

export default function ChatContent() {
  const { containerRef, messagesEndRef, scrollToBottom } = useScrollToBottom();
  const [messages, setMessages] = useAtom(messagesAtom);
  const [showNewMessage, setShowNewMessage] = useAtom(showNewMessageAtom);
  const [lastMessage, setLastMessage] = useAtom(lastMessageAtom);
  const [isScrolling, setIsScrolling] = useState(false);
  const [input, setInput] = useAtom(inputAtom);
  const inputLength = input.trim().length;
  const generateRandomAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    return `https://picsum.photos/seed/${randomSeed}/50`;
  };
  const isNearBottom = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      return container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    }
    return false;
  };

  useEffect(() => {
    if (messages.length > 0) {
      const shouldScrollToBottom = isNearBottom() || isScrolling;

      if (shouldScrollToBottom) {
        scrollToBottom("auto");
      } else {
        setShowNewMessage(true);
        setLastMessage(messages[messages.length - 1]);
      }
    }
  }, [messages]);

  return (
    <>
      <CardContent className="flex-1 overflow-y-auto p-4" ref={containerRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn("flex items-start gap-2", message.role === "user" ? "flex-row-reverse" : "flex-row")}
            >
              <Avatar>
                <AvatarImage src={message.avatar} alt="아바타" />
                <AvatarFallback>{message.role === "user" ? "U" : "A"}</AvatarFallback>
              </Avatar>

              <div
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="shrink-0 w-full px-2 py-2 border-t relative">
        {showNewMessage && lastMessage && (
          <div
            className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-lg p-4 shadow-lg cursor-pointer flex items-center gap-2"
            onClick={() => {
              scrollToBottom("smooth");
              setShowNewMessage(false);
            }}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={lastMessage.avatar} alt="아바타" />
              <AvatarFallback>{lastMessage.role === "user" ? "U" : "A"}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{lastMessage.content}</span>
          </div>
        )}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (inputLength === 0) return;
            setMessages([
              ...messages,
              {
                role: "user",
                content: input,
                avatar: generateRandomAvatar(),
              },
            ]);
            setInput("");
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            id="message"
            placeholder="메시지를 입력해주세요..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button type="submit" size="icon" disabled={inputLength === 0}>
            <Send />
            <span className="sr-only">전송</span>
          </Button>
        </form>
      </CardFooter>
    </>
  );
}
