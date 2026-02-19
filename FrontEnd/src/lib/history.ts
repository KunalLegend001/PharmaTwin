export interface AnalysisHistoryItem {
  id: string;
  date: string;
  drugInput: string;
  result: any;
}

const STORAGE_KEY = "analysis_history";

export const getHistory = (): AnalysisHistoryItem[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveToHistory = (drugInput: string, result: any) => {
  const existing = getHistory();

  const newItem: AnalysisHistoryItem = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    drugInput,
    result,
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newItem, ...existing])
  );
};

export const deleteHistoryItem = (id: string) => {
  const filtered = getHistory().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
