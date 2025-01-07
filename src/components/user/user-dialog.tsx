"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useState } from "react";
import { Check } from "lucide-react";
import { useAtom } from "jotai";
import { userDialogOpenAtom } from "@/jotai/atoms";

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

export default function UserDialog() {
  const [open, setOpen] = useAtom(userDialogOpenAtom);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
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
  );
}
