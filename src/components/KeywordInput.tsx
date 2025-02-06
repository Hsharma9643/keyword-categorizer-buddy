
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Papa from "papaparse";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface KeywordInputProps {
  onAnalyze: (keywords: string[]) => void;
}

export const KeywordInput = ({ onAnalyze }: KeywordInputProps) => {
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const handleAnalyze = () => {
    const keywords = input
      .split("\n")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    onAnalyze(keywords);
  };

  const parseAndProcessData = (data: string) => {
    // Parse the CSV string using PapaParse
    Papa.parse(data, {
      complete: (results) => {
        // Extract keywords from CSV data, handling multiple columns
        const keywords = results.data
          .flat() // Flatten the array in case of multiple columns
          .map((k) => String(k).trim()) // Convert all values to strings and trim
          .filter((k) => k.length > 0); // Remove empty entries

        if (keywords.length > 0) {
          // Update textarea with the keywords
          setInput(keywords.join("\n"));
          // Automatically analyze the keywords
          onAnalyze(keywords);
          
          toast({
            title: "Data processed successfully",
            description: `Processed ${keywords.length} keywords from pasted content`,
          });
        }
      },
      error: (error) => {
        console.error("Error parsing pasted data:", error);
        toast({
          title: "Error processing data",
          description: "There was an error processing the pasted content.",
          variant: "destructive",
        });
      }
    });
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardData = event.clipboardData;
    const pastedData = clipboardData.getData('text');
    
    // Check if the pasted content looks like it's from a spreadsheet
    // (contains tabs or multiple lines with consistent delimiters)
    if (pastedData.includes('\t') || /.*,.*\r?\n.*,.*/.test(pastedData)) {
      event.preventDefault();
      parseAndProcessData(pastedData);
    }
    // If it's regular text, let the default paste behavior handle it
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const keywords = results.data
            .flat()
            .map((k) => String(k).trim())
            .filter((k) => k.length > 0);
          
          setInput(keywords.join("\n"));
          onAnalyze(keywords);
          
          toast({
            title: "File processed successfully",
            description: `Processed ${keywords.length} keywords from the file`,
          });
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          toast({
            title: "Error processing file",
            description: "There was an error processing the uploaded file.",
            variant: "destructive",
          });
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
        Or enter your keywords manually (one per line). You can also paste content directly from a spreadsheet:
      </p>
      <Textarea
        placeholder="Enter your queries or keywords (one per line)"
        className="min-h-[200px] font-mono text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onPaste={handlePaste}
      />
      <Button onClick={handleAnalyze} className="w-full">
        Analyze Queries
      </Button>
    </div>
  );
};

