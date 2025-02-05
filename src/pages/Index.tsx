import { useState } from "react";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay, KeywordResult } from "@/components/ResultsDisplay";

const classifyKeyword = (keyword: string): KeywordResult["intent"] => {
  const lowerKeyword = keyword.toLowerCase();
  
  if (lowerKeyword.includes("how") || lowerKeyword.includes("what") || lowerKeyword.includes("why")) {
    return "informational";
  }
  if (lowerKeyword.includes("buy") || lowerKeyword.includes("price") || lowerKeyword.includes("cost")) {
    return "commercial";
  }
  if (lowerKeyword.includes("login") || lowerKeyword.includes("website") || lowerKeyword.includes("location")) {
    return "navigational";
  }
  return "transactional";
};

const Index = () => {
  const [results, setResults] = useState<KeywordResult[]>([]);

  const handleAnalyze = (keywords: string[]) => {
    const classified = keywords.map((keyword) => ({
      keyword,
      intent: classifyKeyword(keyword),
    }));
    setResults(classified);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">SEO Keyword Classifier</h1>
            <p className="text-muted-foreground">
              Enter your keywords below to analyze their search intent
            </p>
          </div>

          <KeywordInput onAnalyze={handleAnalyze} />

          {results.length > 0 && <ResultsDisplay results={results} />}
        </div>
      </div>
    </div>
  );
};

export default Index;