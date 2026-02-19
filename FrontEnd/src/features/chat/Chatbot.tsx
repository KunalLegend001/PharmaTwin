import { useEffect, useState } from "react";
import { Pharmachatbot } from "@/api/gemini-text";
import { Pill } from "lucide-react";
import StartBot from "./components/StartBot";
import BotChats from "./components/BotChats";
import MessageBot from "./components/MessageBot";

type ChatMessage = {
  id: number;
  message: string;
  type: "client" | "bot";
};

export const PharmaChatbotForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientChat, setClientChat] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newClientMessage: ChatMessage = {
      id: Date.now(),
      message,
      type: "client",
    };

    setClientChat((prev) => [...prev, newClientMessage]);
    setMessage("");
    setLoading(true);

    try {
      const botResponse = await Pharmachatbot({ message });

      const newBotMessage: ChatMessage = {
        id: Date.now() + 1,
        message: botResponse.response,
        type: "bot",
      };

      setClientChat((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // If no messages yet → show StartBot
  if (clientChat.length === 0) {
    return (
      <StartBot
        message={message}
        setMessage={setMessage}
        handleSubmit={handleSubmit}
        isVisible={isVisible}
        type="Pharma Chatbot"
        botIcon={Pill}
        loading={loading}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-4xl mx-auto">
      
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-28">
        <BotChats clientChat={clientChat} />
      </div>

      {/* Fixed Bottom Input */}
      <div className="fixed bottom-4 left-0 right-0 bg-white border rounded-xl shadow-md mx-2">
        <div className="max-w-4xl mx-auto">
          <MessageBot
            message={message}
            setMessage={setMessage}
            handleSubmit={handleSubmit}
            type="Pharma Chatbot"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};