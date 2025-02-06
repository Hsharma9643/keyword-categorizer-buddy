
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Papa from "papaparse";
import { Upload } from "lucide-react";

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          // Extract keywords from CSV data
          const keywords = results.data
            .flat() // Flatten the array in case of multiple columns
            .map((k) => String(k).trim()) // Convert all values to strings and trim
            .filter((k) => k.length > 0); // Remove empty entries
          
          // Update textarea with the keywords
          setInput(keywords.join("\n"));
          
          // Automatically analyze the keywords
          onAnalyze(keywords);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          className="flex items-center space-x-2"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <Upload className="h-4 w-4" />
          <span>Upload CSV/Excel</span>
        </Button>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Or enter your keywords manually (one per line):
      </p>
      <Textarea
        placeholder="Enter your queries or keywords (one per line)"
        className="min-h-[200px] font-mono text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleAnalyze} className="w-full">
        Analyze Queries
      </Button>
    </div>
  );
};
