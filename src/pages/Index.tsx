import { useState } from "react";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay, KeywordResult, QueryIntent } from "@/components/ResultsDisplay";

// Pattern matching rules for classification
const patterns = {
  boolean: /^(is|are|can|does|do|will|should|has|have)/i,
  consequence: /(what happens|effect|impact|result|outcome|consequence)/i,
  instruction: /^(how to|steps to|guide|instructions for|way to|method of)/i,
  comparison: /(vs|versus|compared to|difference between|better|which is better|compare)/i,
  definition: /^(what is|define|meaning|definition|explain|describe)/i,
  reason: /^(why|reason|cause|explain why)/i,
  shortFact: /^(where|who|which|what(?! (to|is))|how many|how much)/i,
  other: /.*/
};

const classifyKeyword = (keyword: string): QueryIntent => {
  // Convert to lowercase for consistent matching
  const processedKeyword = keyword.toLowerCase().trim();
  
  // Check each pattern and return the first match
  for (const [intent, pattern] of Object.entries(patterns)) {
    if (pattern.test(processedKeyword)) {
      return intent as QueryIntent;
    }
  }
  
  // Default to "other" if no patterns match
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
            <h1 className="text-4xl font-bold mb-4">Keyword Intent Classifier</h1>
            <p className="text-muted-foreground">
              Enter your keywords below to analyze their search intent using pattern matching
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