import { useState } from "react";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay, KeywordResult, QueryIntent } from "@/components/ResultsDisplay";
import natural from 'natural';

// Create a classifier instance
const classifier = new natural.BayesClassifier();

// Training data with more examples for better classification
const trainingData = [
  { text: "can dogs eat chocolate", intent: "boolean" },
  { text: "is it raining", intent: "boolean" },
  { text: "does coffee cause anxiety", intent: "boolean" },
  
  { text: "what happens if you skip breakfast", intent: "consequence" },
  { text: "effects of dehydration", intent: "consequence" },
  { text: "impact of social media", intent: "consequence" },
  
  { text: "how to make pasta", intent: "instruction" },
  { text: "guide to meditation", intent: "instruction" },
  { text: "steps to start a business", intent: "instruction" },
  
  { text: "what is blockchain", intent: "definition" },
  { text: "define quantum computing", intent: "definition" },
  { text: "meaning of life", intent: "definition" },
  
  { text: "why is the sky blue", intent: "reason" },
  { text: "why do leaves change color", intent: "reason" },
  { text: "reasons for climate change", intent: "reason" },
  
  { text: "when was america discovered", intent: "shortFact" },
  { text: "who invented electricity", intent: "shortFact" },
  { text: "what color is the sun", intent: "shortFact" },
  
  { text: "best movies of 2023", intent: "opinion" },
  { text: "is remote work better", intent: "opinion" },
  { text: "should I learn python", intent: "opinion" },
  
  { text: "will robots replace humans", intent: "prediction" },
  { text: "future of electric cars", intent: "prediction" },
  { text: "when will mars be colonized", intent: "prediction" },
];

// Train the classifier with the data
trainingData.forEach(item => {
  classifier.addDocument(item.text, item.intent);
});

// Train the model
classifier.train();

const classifyKeyword = (keyword: string): QueryIntent => {
  try {
    // Preprocess the keyword
    const processedKeyword = keyword.toLowerCase().trim();
    
    // Get classification
    const classification = classifier.classify(processedKeyword);
    
    // Ensure the classification matches our QueryIntent type
    return classification as QueryIntent;
  } catch (error) {
    console.error("Classification error:", error);
    return "other";
  }
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