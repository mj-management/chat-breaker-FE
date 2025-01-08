import { useState } from "react";

export const useMessageInput = () => {
  const [input, setInput] = useState("");
  const inputLength = input.trim().length;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const clearInput = () => setInput("");

  return {
    input,
    inputLength,
    handleInputChange,
    clearInput,
  };
};
