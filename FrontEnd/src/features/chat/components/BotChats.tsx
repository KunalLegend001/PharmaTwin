import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  id: number;
  type: "client" | "bot";
  message: string;
}

interface BotChatsProps {
  clientChat: ChatMessage[];
}

const BotChats: React.FC<BotChatsProps> = ({ clientChat }) => {
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      const typingMessage: ChatMessage = { ...lastMessage, message: "" };
      let index = 0;

      setDisplayedMessages((prev) => [...prev, typingMessage]);

      const typeNextChar = () => {
        index++;
        setDisplayedMessages((prevInner) =>
          prevInner.map((msg) =>
            msg.id === lastMessage.id
              ? { ...msg, message: lastMessage.message.slice(0, index) }
              : msg
          )
        );

        if (index < lastMessage.message.length) {
          setTimeout(typeNextChar, 20);
        } else {
          setDisplayedMessages((prevInner) =>
            prevInner.map((msg) =>
              msg.id === lastMessage.id ? lastMessage : msg
            )
          );
        }
      };

      setTimeout(typeNextChar, 20);
    }
  }, [clientChat]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [displayedMessages]);

  return (
    <div className="w-full pb-28 sm:pb-20 overflow-y-auto" ref={scrollRef}>
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