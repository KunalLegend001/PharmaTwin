import React, { useState } from "react";
import type { DragEvent } from "react";
import { analyzeVCF } from "@/api/analysis";
import { saveToHistory } from "@/lib/history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X, Check } from "lucide-react";

interface Props {
  onResult: (data: any) => void;
}

const UploadForm: React.FC<Props> = ({ onResult }) => {
  const [file, setFile] = useState<File | null>(null);
  const [drugs, setDrugs] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [vcfErrors, setVcfErrors] = useState<string[] | null>(null); // To hold VCF format issues
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  // Validate the VCF file for basic format issues
  const validateVCF = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const vcfContent = reader.result as string;

      // Basic check for a valid vcf format (should include BEGIN:VCARD and END:VCARD)
      const errors: string[] = [];

      if (!vcfContent.includes("BEGIN:VCARD") || !vcfContent.includes("END:VCARD")) {
        errors.push("The file does not appear to be a valid VCF format.");
      }

      // Additional format checks could be added here

      if (errors.length > 0) {
        setVcfErrors(errors);
        setIsModalOpen(true); // Open the modal if errors are found
        setError(null); // Clear general error if VCF issues exist
      } else {
        setVcfErrors(null); // Clear any previous errors if the file is valid
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // If VCF errors exist, prevent submission
    if (vcfErrors) return;

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
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      validateVCF(droppedFile); // Validate the dropped file
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-lg border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Pharmacogenomic Analysis</CardTitle>
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
            className={`relative flex flex-col items-center justify-center p-12 border-4 border-dashed rounded-lg cursor-pointer transition
              ${dragActive ? "border-green-400 bg-green-50" : file ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
          >
            <Label htmlFor="vcf" className="mb-2 pointer-events-none text-lg font-medium flex items-center gap-1">
              {file ? (
                <>
                  <Check className="w-4 h-4 text-green-600" /> File Uploaded
                </>
              ) : (
                "Upload VCF File"
              )}
            </Label>

            <Input
              id="vcf"
              type="file"
              accept=".vcf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  const selectedFile = e.target.files[0];
                  setFile(selectedFile);
                  validateVCF(selectedFile); // Validate the selected file
                }
              }}
            />

            <p className="text-sm text-gray-500 pointer-events-none">
              {file ? `✅ ${file.name} selected` : "Drag & Drop your .VCF file here or click to select"}
            </p>

            {file && (
              <div className="absolute top-2 right-2 flex items-center gap-2 bg-white px-2 py-1 rounded shadow">
                <span className="text-xs">{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setVcfErrors(null); // Clear VCF errors if the file is removed
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

          {error && !vcfErrors && (
            <div className="bg-red-100 text-red-700 p-2 rounded border">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading || vcfErrors}>
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

      {/* Modal for VCF Errors */}
      {isModalOpen && vcfErrors && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold">VCF Format Issues</h2>
            <ul className="list-disc pl-5 text-red-600">
              {vcfErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UploadForm;