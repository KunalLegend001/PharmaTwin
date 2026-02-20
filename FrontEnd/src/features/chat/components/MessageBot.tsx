import React from "react";
import { Send2 } from "iconsax-reactjs";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { white } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MessageBotProps {
  message: string;
  setMessage: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  type: string;
  loading: boolean;
}

const MessageBot: React.FC<MessageBotProps> = ({
  message,
  setMessage,
  handleSubmit,
  type,
  loading,
}) => {
  const { t } = useTranslation("translation");

  return (
    <div className="w-full flex justify-end px-4 py-0 shadow-lg z-50">
      {/* Inner container to limit width and move right */}
      <div className="flex w-full max-w-md gap-2">
        <Input
          id="prompt"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 py-6 focus-visible:ring-[0px]"
          placeholder={t("askAbout", { type })}
        />
        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-12 rounded-full transition flex items-center justify-center"
          onClick={(e) => handleSubmit(e)}
        >
          {loading ? (
            <Loader2 className="animate-spin !h-6 !w-6" color={white} />
          ) : (
            <Send2 className="!h-6 !w-6" color={white} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MessageBot;