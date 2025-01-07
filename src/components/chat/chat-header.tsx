"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useAtom } from "jotai";
import { userDialogOpenAtom } from "@/jotai/atoms";

export default function ChatHeader() {
  const [open, setOpen] = useAtom(userDialogOpenAtom);
  return (
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
  );
}
