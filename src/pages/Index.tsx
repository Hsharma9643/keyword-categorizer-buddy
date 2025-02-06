
import { useState } from "react";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay, KeywordResult, QueryIntent } from "@/components/ResultsDisplay";

// Pattern matching rules for classification
const patterns = {
  // Move historical early to take precedence
  historical: /(history|historical|past|when was|ancient|origin|caused.*war|world war|empire|civilization|century|decade|era|dynasty|period|timeline|heritage)/i,
  boolean: /^(is|are|can|does|do|will|should|has|have)/i,
  consequence: /(what happens|effect|impact|result|outcome|consequence)/i,
  instruction: /(how to|steps|guide|tutorial|process|way to|improve|enhance|boost|increase|optimize|master|learn|tips|advice)/i,
  scientific: /(theory|scientific|physics|chemistry|biology|hypothesis|experiment|quantum|molecule|atom|cell|evolution|science|laboratory)/i,
  definition: /(what is|define|meaning|definition|explain|describe)/i,
  reason: /(why|reason|cause|explain why)/i,
  shortFact: /(where|who|which|what(?! is)|how many|how much)/i,
  opinion: /(best|better|worst|should i|recommend|review)/i,
  prediction: /(will|future|predict|forecast|upcoming|next)/i,
  personal: /(my|for me|personal|individual|your|yourself|mine|our|we|us)/i,
  comparison: /(vs|versus|compared to|difference between|better|which is better|compare)/i,
  location: /(near|nearby|distance|location|directions|where is|closest)/i,
  temporal: /(when(?! was)|how long|schedule|duration|time|hours|minutes|days)/i,
  hypothetical: /(what if|if|suppose|hypothetically|assuming|imagine)/i,
  opinionVsFact: /(is it true|actually|really|fact|prove|evidence|opinion|think|feel about)/i,
  procedural: /(process|steps|procedure|sequence|how to|method|way to)/i,
  confirmation: /(is it true|confirm|verify|did|actually|really)/i,
  creative: /(ideas|creative|inspiration|brainstorm|imagine|design)/i,
  technical: /(fix|specifications|technical|troubleshoot|error|bug|issue)/i,
  emotional: /(how to deal with|advice|support|help with|cope|feeling|anxiety|stress)/i,
  entertainment: /(funny|fun|movies?|game|games|play|watch|stream|shows?|series|video|videos|entertainment|leisure|hobby|hobbies|activities|netflix|gaming|chess|sports?|music|dance|puzzle|puzzles|recreation|amusement|pastime)/i,
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
