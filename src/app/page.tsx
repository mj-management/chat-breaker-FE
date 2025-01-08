"use client";

import { Card } from "@/components/ui/card";
import UserDialog from "@/components/user/user-dialog";
import ChatHeader from "@/components/chat/chat-header";
import ChatMessageArea from "@/components/chat/chat-message-area";

export default function Page() {
  return (
    <Card className="w-full h-screen rounded-none flex flex-col">
      <ChatHeader />
      <ChatMessageArea />
      <UserDialog />
    </Card>
  );
}
