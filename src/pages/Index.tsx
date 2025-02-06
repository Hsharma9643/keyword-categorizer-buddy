import { useState } from "react";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay, KeywordResult } from "@/components/ResultsDisplay";
import { classifyQuery } from "@/utils/queryClassifier";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";

const Index = () => {
  const [results, setResults] = useState<KeywordResult[]>([]);
  const { toast } = useToast();

  const handleAnalyze = async (keywords: string[]) => {
    try {
      const classifiedResults = await Promise.all(
        keywords.map(async (keyword) => ({
          keyword,
          intent: await classifyQuery(keyword),
        }))
      );
      setResults(classifiedResults);
    } catch (error) {
      toast({
        title: "Classification Error",
        description: "There was an error classifying your queries. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container max-w-4xl py-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Query Intent Classifier</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter your search queries or keywords (one per line) to analyze their intent using AI.
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