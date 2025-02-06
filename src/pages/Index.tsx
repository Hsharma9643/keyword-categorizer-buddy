import { useState } from "react";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay, KeywordResult, QueryIntent } from "@/components/ResultsDisplay";

// Pattern matching rules for classification with improved regex patterns
const patterns = {
  boolean: /^(is|are|can|does|do|will|should|has|have)\b/i,
  consequence: /\b(what happens|effect|impact|result|outcome|consequence)\b/i,
  instruction: /^(how to|steps to|guide|instructions|way to|method|build|create|make)\b/i,
  comparison: /\b(vs|versus|compared to|difference between|better|which is better|compare|similarities)\b/i,
  definition: /^(what is|define|meaning|definition|explain|describe)\b/i,
  reason: /^(why|reason|cause|explain why)\b/i,
  shortFact: /^(where|who|when|which|what(?! (happens|is))|how many|how much)\b/i,
  other: /.*/
};

const classifyKeyword = (keyword: string): QueryIntent => {
  const processedKeyword = keyword.toLowerCase().trim();
  
  for (const [intent, pattern] of Object.entries(patterns)) {
    if (pattern.test(processedKeyword)) {
      return intent as QueryIntent;
    }
  }
  
  return "other";
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
            <h1 className="text-4xl font-bold mb-4">Query Intent Classifier</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter your search queries or keywords (one per line) to analyze their intent based on linguistic patterns.
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