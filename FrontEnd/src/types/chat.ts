export interface ChatMessage {
  id: number;
  type: "client" | "bot";
  message: string;
}