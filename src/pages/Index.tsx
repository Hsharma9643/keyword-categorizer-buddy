import { useState } from "react";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay, KeywordResult } from "@/components/ResultsDisplay";
import { classifyQuery } from "@/utils/queryClassifier";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-4xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Free SEO Keyword Intent Classifier Tool</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter your search queries or keywords (one per line) to analyze their search intent using pattern recognition.
            </p>
          </div>

          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">About the Tool</h2>
            <p className="text-muted-foreground">
              My Free SEO Keyword Intent Classifier helps you instantly analyze search intent—whether it's informational, navigational, transactional, or commercial—using pattern recognition. It categorizes user-provided keywords or phrases into one of eight predefined categories, giving you clearer insights into what searchers are looking for.
            </p>
          </div>

          <KeywordInput onAnalyze={handleAnalyze} />

          {results.length > 0 && <ResultsDisplay results={results} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;