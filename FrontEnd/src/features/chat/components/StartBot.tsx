import { type LucideIcon } from "lucide-react";
import { primary } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import IconCircle from "../components/IconCircle";

interface StartBotProps {
  message: string;
  setMessage: (value: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  isVisible: boolean;
  type: string;
  botIcon: LucideIcon;
  loading: boolean;
}

const StartBot: React.FC<StartBotProps> = ({
  message,
  setMessage,
  handleSubmit,
  isVisible,
  type,
  botIcon,
  loading,
}) => {
  const Icon = botIcon;
  const { t } = useTranslation("translation");

  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-black-400 to-white-500 flex items-center justify-center px-4">
      <Card
        className={`w-full max-w-2xl mx-auto my-10 p-6 sm:p-8 transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <IconCircle icon={<Icon color={primary} />} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-foreground drop-shadow-lg">
            {type}
          </h1>
          <div className="space-y-2 mt-10">
            <Textarea
              className="h-36 sm:h-40"
              id="prompt"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("startConversationPlaceholder")}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-white flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              t("sendMessage")
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default StartBot;