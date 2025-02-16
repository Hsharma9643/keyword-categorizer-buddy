
import { useState } from 'react';
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { ReviewMisclassifications } from "@/components/ReviewMisclassifications";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share";

export const Index = () => {
  const [results, setResults] = useState<any[]>([]);
  const shareUrl = "https://seokeywordintentclassifier.com/";
  const title = "SEO Keyword Intent Classifier";

  const handleAnalyze = (queries: string[]) => {
    // Basic validation to prevent empty queries
    if (!queries || queries.length === 0 || queries.every(q => !q.trim())) {
      alert("Please enter at least one keyword to analyze.");
      return;
    }

    // Simulate fetching results (replace with actual API call)
    const simulatedResults = queries.map(query => ({
      query,
      intent: "Informational", // Replace with actual classification logic
      confidence: 0.85,
    }));
    setResults(simulatedResults);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="py-8">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Free SEO Keyword Intent Classifier Tool</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Enter your search queries or keywords (one per line) to analyze their search intent using pattern recognition.
              </p>
            </div>

            <KeywordInput onAnalyze={handleAnalyze} />
            
            {results.length > 0 && <ResultsDisplay results={results} />}

            <section className="text-left">
              <h2 className="text-2xl font-semibold mb-4">About the Tool</h2>
              <p className="text-muted-foreground">
                This SEO Keyword Intent Classifier uses pattern recognition to analyze and classify search queries based on their intent. It helps you understand what users are looking for when they type specific keywords into search engines.
              </p>
            </section>

            <section className="text-left">
              <h2 className="text-2xl font-semibold mb-4">Keyword Intent Categories & Their Meaning</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Informational Intent</h3>
                  <p className="text-muted-foreground">Searches seeking information, answers, or knowledge about a topic.</p>
                </div>
                <div>
                  <h3 className="font-medium">Navigational Intent</h3>
                  <p className="text-muted-foreground">Searches looking for a specific website or page.</p>
                </div>
                <div>
                  <h3 className="font-medium">Commercial Intent</h3>
                  <p className="text-muted-foreground">Searches investigating products or services but not ready to purchase.</p>
                </div>
                <div>
                  <h3 className="font-medium">Transactional Intent</h3>
                  <p className="text-muted-foreground">Searches with immediate purchase or action intent.</p>
                </div>
              </div>
            </section>

            <section className="text-left">
              <h2 className="text-2xl font-semibold mb-4">Emotional Tone & Query Depth</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our tool analyzes the emotional context and complexity of each query:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Emotional Tone: Measures the sentiment and urgency in the query</li>
                  <li>Query Depth: Evaluates how specific or detailed the search is</li>
                </ul>
              </div>
            </section>

            <section className="text-left">
              <h2 className="text-2xl font-semibold mb-4">Use Cases & Benefits</h2>
              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Content Strategy: Align content with user search intent</li>
                  <li>SEO Optimization: Target keywords more effectively</li>
                  <li>Marketing Planning: Develop intent-based marketing campaigns</li>
                  <li>User Experience: Improve website navigation and content structure</li>
                </ul>
              </div>
            </section>

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Share this Tool</h2>
              <div className="flex justify-center space-x-4">
                <FacebookShareButton url={shareUrl} title={title}>
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={title}>
                  <TwitterIcon size={40} round />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} title={title}>
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ReviewMisclassifications />
      
      <div className="text-center text-sm text-muted-foreground pb-4">
        <p>This SEO Keyword Intent Classifier Tool is created by <a href="https://www.linkedin.com/in/hemantsharmax/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Hemant Sharma</a> at Adschoolmaster.</p>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
