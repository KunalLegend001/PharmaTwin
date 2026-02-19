import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  id: number;
  type: string;
  message: string;
}

interface BotChatsProps {
  clientChat: ChatMessage[];
}

const BotChats: React.FC<BotChatsProps> = ({ clientChat }) => {
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (clientChat.length === 0) return;

    const lastMessage = clientChat[clientChat.length - 1];
    const alreadyDisplayed = displayedMessages.some(
      (msg) => msg.id === lastMessage.id
    );
    if (alreadyDisplayed) return;

    if (lastMessage.type === "client") {
      setDisplayedMessages((prev) => [...prev, lastMessage]);
    } else {
      let index = 0;
      const typingMessage: ChatMessage = { ...lastMessage, message: "" };

      setDisplayedMessages((prev) => [...prev, typingMessage]);

      const typingInterval = setInterval(() => {
        index++;
        setDisplayedMessages((prev) =>
          prev.map((msg) =>
            msg.id === lastMessage.id
              ? { ...msg, message: lastMessage.message.slice(0, index) }
              : msg
          )
        );

        if (index >= lastMessage.message.length) {
          clearInterval(typingInterval);
        }
      }, 0);
    }
  }, [clientChat, displayedMessages]);

  return (
    <div className="w-full pb-28 sm:pb-20">
      {displayedMessages.map((chat) => (
        <div key={chat.id} className="p-2 clear-both">
          {chat.type === "client" ? (
            <div className="float-right max-w-[85%] sm:max-w-[60%]">
              <span className="bg-primary text-white inline-block px-4 py-3 rounded-tr-none rounded-2xl break-words">
                {chat.message}
              </span>
            </div>
          ) : (
            <div className="float-left">
              <span className="inline-block px-4 py-3 rounded-2xl break-words">
                <ReactMarkdown>{chat.message}</ReactMarkdown>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BotChats;