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

          <KeywordInput onAnalyze={handleAnalyze} />

          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">About the Tool</h2>
            <p className="text-muted-foreground">
              My Free SEO Keyword Intent Classifier helps you instantly analyze search intent—whether it's informational, navigational, transactional, or commercial—using pattern recognition. It categorizes user-provided keywords or phrases into one of eight predefined categories, giving you clearer insights into what searchers are looking for.
            </p>
          </div>

          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Keyword Intent Categories & Their Meaning</h2>
            <p className="text-muted-foreground mb-6">
              The eight categories used in this tool classify user queries based on their linguistic structure and intent. Understanding these categories helps predict the type of response users expect, making it easier to optimize content for search engines.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">1. Boolean</h3>
                <p className="text-muted-foreground">✔️ Identifies Yes/No or True/False queries.</p>
                <p className="text-muted-foreground">🔹 Example: "Can dogs eat chocolate?"</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Consequence</h3>
                <p className="text-muted-foreground">✔️ Analyzes queries about outcomes or effects.</p>
                <p className="text-muted-foreground">🔹 Example: "What happens if you don't sleep for 24 hours?"</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Instruction</h3>
                <p className="text-muted-foreground">✔️ Detects step-by-step guides and tutorials.</p>
                <p className="text-muted-foreground">🔹 Example: "How to bake a cake."</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4. Comparison</h3>
                <p className="text-muted-foreground">✔️ Recognizes queries comparing two or more entities.</p>
                <p className="text-muted-foreground">🔹 Example: "iPhone 15 vs Samsung Galaxy S23."</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">5. Definition</h3>
                <p className="text-muted-foreground">✔️ Finds queries asking for meanings or explanations.</p>
                <p className="text-muted-foreground">🔹 Example: "What is artificial intelligence?"</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">6. Reason</h3>
                <p className="text-muted-foreground">✔️ Identifies questions seeking causes or justifications.</p>
                <p className="text-muted-foreground">🔹 Example: "Why is the sky blue?"</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">7. Short Fact</h3>
                <p className="text-muted-foreground">✔️ Classifies factual questions expecting brief answers.</p>
                <p className="text-muted-foreground">🔹 Example: "Who invented the telephone?"</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">8. Other</h3>
                <p className="text-muted-foreground">✔️ Covers queries that don't fit standard categories.</p>
                <p className="text-muted-foreground">🔹 Example: "Tell me a joke."</p>
              </div>
            </div>
          </div>

          {results.length > 0 && <ResultsDisplay results={results} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;