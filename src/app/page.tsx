"use client";

import { Card } from "@/components/ui/card";
import UserDialog from "@/components/user/user-dialog";
import ChatHeader from "@/components/chat/chat-header";
import ChatContent from "@/components/chat/chat-content";

export default function Page() {
  return (
    <Card className="w-full h-screen rounded-none flex flex-col">
      <ChatHeader />
      <ChatContent />
      <UserDialog />
    </Card>
  );
}
