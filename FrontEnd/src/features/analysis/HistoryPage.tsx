import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getHistory,
  deleteHistoryItem,
  clearHistory,
} from "@/lib/history";
import type { AnalysisHistoryItem } from "@/lib/history";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleView = (result: any) => {
    localStorage.setItem("selected_result", JSON.stringify(result));
    navigate("/analysis");
  };

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    setHistory(getHistory());
  };

  const handleClearAll = () => {
    clearHistory();
    setHistory([]);
  };

  if (history.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No previous analyses found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4 px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analysis History</h2>
        <Button variant="destructive" onClick={handleClearAll}>
          Clear All
        </Button>
      </div>

      {history.map((item) => (
        <Card key={item.id}>
          <CardContent className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
            <div>
              <p className="text-sm text-gray-500">
                {new Date(item.date).toLocaleString()}
              </p>
              <p className="font-semibold">{item.drugInput}</p>
              <p className="text-sm">
                Risk: {item.result?.risk_assessment?.risk_label || "Unknown"}
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => handleView(item.result)}>
                <Eye className="w-4 h-4 mr-1" /> View
              </Button>

              <Button
                variant="destructive"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HistoryPage;
