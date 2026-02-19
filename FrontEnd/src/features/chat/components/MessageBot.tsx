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
    <div className="w-full px-4 py-0 shadow-lg z-50">
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <div className="rounded-lg border-none px-0 py-0 w-full">
          <Input
            id="prompt"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full py-6 focus-visible:ring-[0px]"
            placeholder={t("askAbout", { type })}
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-12 rounded-full transition flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="animate-spin !h-6 !w-6" color={white} />
          ) : (
            <Send2 className="!h-6 !w-6" color={white} />
          )}
        </Button>
      </form>
    </div>
  );
};

export default MessageBot;