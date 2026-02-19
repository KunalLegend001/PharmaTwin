import  { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultDisplay from "./components/ResultDisplay";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/shared/Header";


function Analysis() {
  const [result, setResult] = useState<any>(null);
  const { t } = useTranslation("analysis");

  return (
    <div>
      <Header title={t("title")} />
      <Separator />
      <UploadForm onResult={setResult} />
      <ResultDisplay result={result} />
    </div>
  );
}

export default Analysis;


