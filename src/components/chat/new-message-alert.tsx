import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NewMessageAlertProps {
  message: {
    role: string;
    content: string;
    avatar: string;
  };
  onView: () => void;
}

export default function NewMessageAlert({ message, onView }: NewMessageAlertProps) {
  return (
    <div
      className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground rounded-lg p-4 shadow-lg cursor-pointer flex items-center gap-2"
      onClick={onView}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={message.avatar} alt="아바타" />
        <AvatarFallback>{message.role === "user" ? "U" : "A"}</AvatarFallback>
      </Avatar>
      <span className="text-sm">{message.content}</span>
    </div>
  );
}
