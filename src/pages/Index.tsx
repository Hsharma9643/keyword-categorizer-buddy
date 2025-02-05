import { useState } from "react";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay, KeywordResult, QueryIntent } from "@/components/ResultsDisplay";
import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const classifier = new natural.BayesClassifier();

// Train the classifier with sample data
const trainingData = [
  // Boolean queries
  { text: "can dogs eat chocolate", category: "boolean" },
  { text: "is it going to rain today", category: "boolean" },
  { text: "does the iphone have a headphone jack", category: "boolean" },
  
  // Consequence queries
  { text: "what happens if you don't sleep", category: "consequence" },
  { text: "effect of climate change", category: "consequence" },
  { text: "impact of social media on mental health", category: "consequence" },
  
  // Instruction queries
  { text: "how to bake a cake", category: "instruction" },
  { text: "steps to change a tire", category: "instruction" },
  { text: "guide to learn python", category: "instruction" },
  
  // Definition queries
  { text: "what is artificial intelligence", category: "definition" },
  { text: "meaning of photosynthesis", category: "definition" },
  { text: "define blockchain technology", category: "definition" },
  
  // And so on for other categories...
];

// Train the classifier
trainingData.forEach(item => {
  classifier.addDocument(item.text, item.category);
});
classifier.train();

const classifyKeyword = (keyword: string): QueryIntent => {
  // Preprocess the keyword
  const processedKeyword = keyword.toLowerCase().trim();
  
  // Use natural's classifier
  const classification = classifier.classify(processedKeyword);
  
  // Ensure the classification matches our QueryIntent type
  return classification as QueryIntent;
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
              Enter your keywords below to analyze their search intent using Natural Language Processing
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