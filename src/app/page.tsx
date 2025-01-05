"use client";

import { Check, Plus, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

const users = [
  {
    name: "김민준",
    email: "minjun.kim@example.com",
    avatar: "/avatars/01.png",
  },
  {
    name: "이서윤",
    email: "seoyoon.lee@example.com",
    avatar: "/avatars/02.png",
  },
  {
    name: "박지호",
    email: "jiho.park@example.com",
    avatar: "/avatars/03.png",
  },
  {
    name: "최지우",
    email: "jiwoo.choi@example.com",
    avatar: "/avatars/04.png",
  },
  {
    name: "정우성",
    email: "wooseong.jung@example.com",
    avatar: "/avatars/05.png",
  },
] as const;

type User = (typeof users)[number];

export default function Page() {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState([
    {
      role: "agent",
      content: "안녕하세요, 무엇을 도와드릴까요?",
      avatar: `https://picsum.photos/seed/agent/50`,
    },
    {
      role: "user",
      content: "계정 문제로 어려움을 겪고 있습니다.",
      avatar: `https://picsum.photos/seed/user1/50`,
    },
    {
      role: "agent",
      content: "어떤 문제가 있으신가요?",
      avatar: `https://picsum.photos/seed/agent/50`,
    },
    {
      role: "user",
      content: "로그인할 수 없습니다.",
      avatar: `https://picsum.photos/seed/user2/50`,
    },
  ]);
  const [input, setInput] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [lastMessage, setLastMessage] = useState<(typeof messages)[0] | null>(null);
  const inputLength = input.trim().length;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const near = isNearBottom();
      if (near) {
        scrollToBottom();
      } else {
        setShowNewMessage(true);
        setLastMessage(messages[messages.length - 1]);
      }
    }
  }, [messages]);

  return (
    <>
      <Card className="w-full h-screen rounded-none flex flex-col">
        <CardHeader className="flex flex-row items-center shrink-0 border-b p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="이미지" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">소피아 데이비스</p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" className="ml-auto rounded-full" onClick={() => setOpen(true)}>
                  <Plus />
                  <span className="sr-only">새 메시지</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>새 메시지</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
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
                scrollToBottom();
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
              placeholder="메시지를 입력하세요..."
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
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>사용자</DialogTitle>
            <DialogDescription>현재 채팅중인 사용자를 확인해보세요.</DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
            <CommandInput placeholder="사용자를 검색하세요..." />
            <CommandList>
              <CommandEmpty>사용자를 찾을 수 없습니다.</CommandEmpty>
              <CommandGroup className="p-2">
                {users.map((user) => (
                  <CommandItem
                    key={user.email}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (selectedUsers.includes(user)) {
                        return setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser !== user));
                      }
                      return setSelectedUsers([...users].filter((u) => [...selectedUsers, user].includes(u)));
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt="이미지" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    {selectedUsers.includes(user) ? <Check className="ml-auto flex h-5 w-5 text-primary" /> : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {selectedUsers.length > 0 ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedUsers.map((user) => (
                  <Avatar key={user.email} className="inline-block border-2 border-background">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">이 대화에 추가할 사용자를 선택하세요.</p>
            )}
            <Button
              disabled={selectedUsers.length < 2}
              onClick={() => {
                setOpen(false);
              }}
            >
              계속
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
