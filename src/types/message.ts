export interface Message {
  role: "user" | "agent";
  content: string;
  avatar: string;
}
