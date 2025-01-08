import { Message } from "@/types/message";
import { atom } from "jotai";

export const userDialogOpenAtom = atom(false);

export const messagesAtom = atom<Message[]>([
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
