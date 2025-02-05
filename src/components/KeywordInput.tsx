import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface KeywordInputProps {
  onAnalyze: (keywords: string[]) => void;
}

export const KeywordInput = ({ onAnalyze }: KeywordInputProps) => {
  const [input, setInput] = useState("");

  const handleAnalyze = () => {
    const keywords = input
      .split("\n")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    onAnalyze(keywords);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter your keywords (one per line)"
        className="min-h-[200px] font-mono"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleAnalyze} className="w-full">
        Analyze Keywords
      </Button>
    </div>
  );
};