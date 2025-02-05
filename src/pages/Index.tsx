import { useState } from "react";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay, KeywordResult, QueryIntent } from "@/components/ResultsDisplay";

const classifyKeyword = (keyword: string): QueryIntent => {
  const lowerKeyword = keyword.toLowerCase();
  
  // Boolean queries
  if (/^(can|is|does|are|will|has|should|do)\b/.test(lowerKeyword)) {
    return "boolean";
  }
  
  // Consequence queries
  if (/(what happens|outcome|effect|impact|result)/.test(lowerKeyword)) {
    return "consequence";
  }
  
  // Instruction queries
  if (/(how to|steps to|guide|tutorial|instructions)/.test(lowerKeyword)) {
    return "instruction";
  }
  
  // Comparison queries
  if (/(vs|versus|compare|difference between|better)/.test(lowerKeyword)) {
    return "comparison";
  }
  
  // Definition queries
  if (/(what is|meaning of|define|explanation of)/.test(lowerKeyword)) {
    return "definition";
  }
  
  // Reason queries
  if (/^why|reasons?|cause/.test(lowerKeyword)) {
    return "reason";
  }
  
  // Short fact queries
  if (/^(who|what|when|where|how many)/.test(lowerKeyword)) {
    return "shortFact";
  }
  
  // Opinion queries
  if (/(best|worst|recommend|think|opinion)/.test(lowerKeyword)) {
    return "opinion";
  }
  
  // Prediction queries
  if (/(will|forecast|predict|future)/.test(lowerKeyword)) {
    return "prediction";
  }
  
  // Location-based queries
  if (/(where|near|location|distance)/.test(lowerKeyword)) {
    return "locationBased";
  }
  
  // Temporal queries
  if (/(when|time|duration|schedule|how long)/.test(lowerKeyword)) {
    return "temporal";
  }
  
  // Hypothetical queries
  if (/(what if|suppose|hypothetically)/.test(lowerKeyword)) {
    return "hypothetical";
  }
  
  // Procedural queries
  if (/(process|procedure|steps|sequence)/.test(lowerKeyword)) {
    return "procedural";
  }
  
  // Exploratory queries
  if (/(tell me about|explain|explore|discuss)/.test(lowerKeyword)) {
    return "exploratory";
  }
  
  // Confirmation queries
  if (/(confirm|verify|is it true)/.test(lowerKeyword)) {
    return "confirmation";
  }
  
  // Creative queries
  if (/(ideas|creative|inspiration|brainstorm)/.test(lowerKeyword)) {
    return "creative";
  }
  
  // Technical queries
  if (/(fix|specifications|technical|troubleshoot)/.test(lowerKeyword)) {
    return "technical";
  }
  
  // Emotional/Support queries
  if (/(help|advice|support|cope|deal with)/.test(lowerKeyword)) {
    return "emotional";
  }
  
  // Entertainment queries
  if (/(fun|game|play|watch|entertainment)/.test(lowerKeyword)) {
    return "entertainment";
  }
  
  // Historical queries
  if (/(history|historical|past|when was)/.test(lowerKeyword)) {
    return "historical";
  }
  
  // Scientific queries
  if (/(science|theory|experiment|scientific)/.test(lowerKeyword)) {
    return "scientific";
  }
  
  // Personal queries
  if (/(my|personal|me|individual)/.test(lowerKeyword)) {
    return "personal";
  }
  
  // Cultural queries
  if (/(culture|tradition|customs|beliefs)/.test(lowerKeyword)) {
    return "cultural";
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
            <h1 className="text-4xl font-bold mb-4">Advanced Keyword Classifier</h1>
            <p className="text-muted-foreground">
              Enter your keywords below to analyze their search intent using 24 different categories
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