import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/shared/Header";

const Home = () => {
  const { t } = useTranslation("home");
  return (
    <div>
      <Header title={t("title")} />
      <Separator />
    </div>
  );
};

export default Home;
