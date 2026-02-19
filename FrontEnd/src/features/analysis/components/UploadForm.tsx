import React, { useState } from "react";
import type { DragEvent } from "react";
import { analyzeVCF } from "@/api/analysis";
import { saveToHistory } from "@/lib/history";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X } from "lucide-react";

interface Props {
  onResult: (data: any) => void;
}

const UploadForm: React.FC<Props> = ({ onResult }) => {
  const [file, setFile] = useState<File | null>(null);
  const [drugs, setDrugs] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!file) return setError("Please upload a VCF file.");
    if (!drugs.trim()) return setError("Please enter at least one drug.");
    if (!file.name.endsWith(".vcf"))
      return setError("Only .vcf files are allowed.");

    setLoading(true);

    try {
      const data = await analyzeVCF(file, drugs);
      onResult(data);
      saveToHistory(drugs, data);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-lg border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Pharmacogenomic Analysis
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Drag & Drop */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("vcf")?.click()}
            className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded cursor-pointer transition ${
              dragActive ? "border-green-400 bg-green-50" : "border-gray-300"
            }`}
          >
            <Label htmlFor="vcf" className="mb-2 pointer-events-none">
              Upload VCF File
            </Label>

            <Input
              id="vcf"
              type="file"
              accept=".vcf"
              className="hidden"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />

            <p className="text-sm text-gray-500 pointer-events-none">
              Drag & Drop or Click
            </p>

            {file && (
              <div className="absolute top-2 right-2 flex items-center gap-2 bg-white px-2 py-1 rounded shadow">
                <span className="text-xs">{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Drug Input */}
          <div>
            <Label>Drug Name(s)</Label>
            <Input
              placeholder="CODEINE, WARFARIN"
              value={drugs}
              onChange={(e) => setDrugs(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded border">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
