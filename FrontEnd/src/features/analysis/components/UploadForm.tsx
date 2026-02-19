import React, { useState } from "react";
import { analyzeVCF } from "@/api/analysis";

import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface Props {
  onResult: (data: any) => void;
}

const UploadForm: React.FC<Props> = ({ onResult }) => {
  const [file, setFile] = useState<File | null>(null);
  const [drugs, setDrugs] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation("analysis");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError(t("vccError"));
      return;
    }

    if (!drugs.trim()) {
      setError(t("noDrug"));
      return;
    }

    if (!file.name.endsWith(".vcf")) {
      setError(t("onlyVCF"));
      return;
    }

    setLoading(true);

    try {
      const data = await analyzeVCF(file, drugs);
      onResult(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.error || t("somethingWentWrong")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {t("analysis")}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="vcf">Upload VCF File</Label>
            <Input
              id="vcf"
              type="file"
              accept=".vcf"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            {file && (
              <p className="text-sm text-gray-500">Selected: {file.name}</p>
            )}
          </div>

          {/* Drug Input */}
          <div className="space-y-2">
            <Label htmlFor="drugs">{t("name")}</Label>
            <Input
              id="drugs"
              type="text"
              placeholder="CODEINE, WARFARIN"
              value={drugs}
              onChange={(e) => setDrugs(e.target.value)}
            />
            <p className="text-xs text-gray-400">
              {t("multipe")}
            </p>
          </div>

          {/* Error Box */}
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded border border-red-300">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("analyzing")}
              </>
            ) : (
              t("analyze")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
