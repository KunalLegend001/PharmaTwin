import Logo from "@/components/shared/Logo";
import { TypographyH3 } from "@/components/ui/typography";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";

const NotFound = () => {
  const { t } = useTranslation("common");
  return (
    <div className="h-screen w-full">
      <div className="fixed top-0 left-0 p-2">
        <div className="flex gap-2 items-center">
          <Logo />
        </div>
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <div>
          <TypographyH3 text="404 Not Found" />

          <TypeAnimation sequence={[t("notFound404")]} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
