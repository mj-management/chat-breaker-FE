import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface MessageInputProps {
  input: string;
  inputLength: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function MessageInput({ input, inputLength, onInputChange, onSubmit }: MessageInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex w-full items-center space-x-2">
      <Input
        id="message"
        placeholder="메시지를 입력해주세요..."
        className="flex-1"
        autoComplete="off"
        value={input}
        onChange={onInputChange}
      />
      <Button type="submit" size="icon" disabled={inputLength === 0}>
        <Send />
        <span className="sr-only">전송</span>
      </Button>
    </form>
  );
}
