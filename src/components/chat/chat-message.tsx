import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ChatMessageProps {
  message: {
    role: string;
    content: string;
    avatar: string;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={cn("flex items-start gap-2", message.role === "user" ? "flex-row-reverse" : "flex-row")}>
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
  );
}
