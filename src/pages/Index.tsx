import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { KeywordInput } from "@/components/KeywordInput";
import { ResultsDisplay, KeywordResult } from "@/components/ResultsDisplay";
import { classifyQuery } from "@/utils/queryClassifier";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";
import { X, Facebook, Linkedin } from "lucide-react";
import { Header } from "@/components/Header";
import { ReviewMisclassifications } from "@/components/ReviewMisclassifications";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Index = () => {
  const [results, setResults] = useState<KeywordResult[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAnalyze = async (keywords: string[]) => {
    try {
      const classifiedResults = await Promise.all(
        keywords.map(async (keyword) => {
          const analysis = await classifyQuery(keyword);
          return {
            keyword,
            intent: analysis.intent,
            confidence: analysis.confidence,
            emotionalTone: analysis.emotionalTone,
            queryDepth: analysis.queryDepth
          };
        })
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

  const handleShare = (platform: string) => {
    const url = "https://app.adschoolmaster.com/";
    const text = "Check out this free SEO Intent Classifier Tool!";
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
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

            <div className="bg-muted rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">About the Tool</h2>
              <p className="text-muted-foreground">
                My Free SEO Keyword Intent Classifier instantly analyses search query intent using pattern recognition. It categorises keywords into one of eight predefined categories and now also evaluates Emotional Tone (e.g., urgency, curiosity, neutrality) and Query Depth (surface-level vs. in-depth). Get clearer insights to tailor your content strategy effectively.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Keyword Intent Categories & Their Meaning</h2>
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
                  <h3 className="font-semibold mb-2">8. Explicit Local</h3>
                  <p className="text-muted-foreground">✔️ Identifies location-specific queries and local searches.</p>
                  <p className="text-muted-foreground">🔹 Example: "Coffee shops near me" or "Restaurants in London"</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">9. Product</h3>
                  <p className="text-muted-foreground">✔️ Detects queries about tangible items or products.</p>
                  <p className="text-muted-foreground">🔹 Example: "Laptop backpack" or "iPhone cover"</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">10. Service</h3>
                  <p className="text-muted-foreground">✔️ Identifies queries related to services or service providers.</p>
                  <p className="text-muted-foreground">🔹 Example: "House cleaning services" or "Car repair"</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">11. Brand</h3>
                  <p className="text-muted-foreground">✔️ Recognizes brand-specific searches and company names.</p>
                  <p className="text-muted-foreground">🔹 Example: "Nike shoes" or "Apple MacBook"</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">12. Feature or Attribute</h3>
                  <p className="text-muted-foreground">✔️ Identifies queries about specific characteristics or properties.</p>
                  <p className="text-muted-foreground">🔹 Example: "Vegan snacks" or "Waterproof cameras"</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">13. Pricing</h3>
                  <p className="text-muted-foreground">✔️ Detects queries about costs, prices, or affordability.</p>
                  <p className="text-muted-foreground">🔹 Example: "How much is iPhone 15?" or "Cheap hotels"</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">14. Seasonal or Promotional</h3>
                  <p className="text-muted-foreground">✔️ Identifies queries related to sales, discounts, or seasonal events.</p>
                  <p className="text-muted-foreground">🔹 Example: "Black Friday deals" or "Christmas offers"</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">15. Other</h3>
                  <p className="text-muted-foreground">✔️ Covers relevant queries that don't fit standard categories.</p>
                  <p className="text-muted-foreground">🔹 Example: "Popular trends 2024"</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">16. Uncategorized</h3>
                  <p className="text-muted-foreground">✔️ Queries with no clear category fit or low confidence classification.</p>
                  <p className="text-muted-foreground">🔹 Example: Ambiguous or unclear queries</p>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Emotional Tone & Query Depth</h2>
              <p className="text-muted-foreground mb-6">
                My Free SEO Intent Classifier now goes further than ever before in decoding search query intent. Using advanced pattern recognition, it not only categorises user-provided keywords or phrases into one of eight predefined intent categories but also evaluates two new dimensions—Emotional Tone and Query Depth.
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">🔹 Emotional Tone Analysis</h3>
                  <p className="text-muted-foreground">
                    ✔️ Advanced language pattern recognition to identify sentiment cues such as urgency, curiosity, or neutrality.
                  </p>
                  <p className="text-muted-foreground">
                    ✔️ Quickly discern whether a searcher's query carries an urgent call-to-action or a thoughtful inquiry.
                  </p>
                  <p className="text-muted-foreground">
                    ✔️ Helps you tailor your content to match the emotional context of the search.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🔹 Query Depth Measurement</h3>
                  <p className="text-muted-foreground">
                    ✔️ Distinguishes between surface-level and in-depth queries for better content planning.
                  </p>
                  <p className="text-muted-foreground">
                    ✔️ Understand not only what users are asking but also how detailed their search needs are.
                  </p>
                  <p className="text-muted-foreground">
                    ✔️ Empowers you to create content that meets both quick answer and comprehensive insight demands.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-6">
                By integrating these additional intent dimensions into our robust analysis workflow, My Free SEO Intent Classifier delivers clearer, more actionable insights into what searchers are looking for. Optimise your SEO strategy and content creation with a tool that goes beyond basic categorisation—providing the nuance necessary to outsmart the competition and connect with your audience effectively.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Use Cases & Benefits</h2>
              <p className="text-muted-foreground mb-6">
                The SEO Keyword Intent Classifier is a powerful tool for anyone looking to better understand search queries and optimize content accordingly. Here's how it can be used effectively:
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">🔹 Content Marketers & Bloggers</h3>
                  <p className="text-muted-foreground">✔️ Identify the right content format based on search intent (e.g., tutorials for instructional queries, comparisons for "vs" searches).</p>
                  <p className="text-muted-foreground">✔️ Optimize blog posts to match what users are actually looking for.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🔹 SEO Professionals</h3>
                  <p className="text-muted-foreground">✔️ Map keywords to the correct funnel stage (awareness, consideration, decision).</p>
                  <p className="text-muted-foreground">✔️ Improve on-page SEO by aligning content with searcher expectations.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🔹 PPC & Paid Search Advertisers</h3>
                  <p className="text-muted-foreground">✔️ Target the right audience with more relevant ads.</p>
                  <p className="text-muted-foreground">✔️ Avoid bidding on low-converting informational queries.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🔹 E-commerce Businesses</h3>
                  <p className="text-muted-foreground">✔️ Understand transactional vs. informational intent to optimize product and category pages.</p>
                  <p className="text-muted-foreground">✔️ Improve internal linking by connecting users to relevant content.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🔹 YouTubers</h3>
                  <p className="text-muted-foreground">✔️ Helps YouTube creators fine-tune video titles, descriptions, and tags by aligning them with the underlying search intent.</p>
                  <p className="text-muted-foreground">✔️ Reveals the emotional tone and query depth of user searches, guiding content creation to better resonate with your target audience.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🔹 AI & Chatbot Developers</h3>
                  <p className="text-muted-foreground">✔️ Train chatbots and virtual assistants to recognize and respond appropriately to different types of queries.</p>
                  <p className="text-muted-foreground">✔️ Enhance user experience by providing more accurate and helpful answers.</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-6">
                Whether you're creating content, running ads, or optimizing for search, this tool helps you align your strategy with real user intent for better results.
              </p>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Disclaimer: This page's content was created using DeepSeek.</p>
            </div>

            <div className="flex justify-center space-x-4 pb-8">
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Share on X (formerly Twitter)"
              >
                <X strokeWidth={1.5} className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook strokeWidth={1.5} className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin strokeWidth={1.5} className="w-5 h-5 text-foreground" />
              </button>
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
