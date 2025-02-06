import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface KeywordInputProps {
  onAnalyze: (keywords: string[]) => void;
}

export const KeywordInput = ({ onAnalyze }: KeywordInputProps) => {
  const [input, setInput] = useState("");

  const handleAnalyze = () => {
    const keywords = input
      .split("\n")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    onAnalyze(keywords);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter your queries or keywords (one per line)

BOOLEAN (Is, Are, Can, Does, Do, Will):
Is artificial intelligence dangerous?
Are electric cars better for the environment?

CONSEQUENCE (What happens, Effect, Impact):
What happens during photosynthesis?
Effect of social media on mental health

INSTRUCTION (How to, Steps to, Guide):
How to make a chocolate cake?
Steps to change a car tire

COMPARISON (vs, versus, compared to):
iPhone vs Android
MacBook compared to Windows laptop

DEFINITION (What is, Define, Meaning):
What is quantum computing?
Define photosynthesis

REASON (Why, Cause, Explain why):
Why do leaves change color?
Why is the sky blue?

SHORT FACT (Where, Who, When, Which):
When was the internet invented?
Who invented the telephone?

OTHER:
Tell me a joke
Random fact"
        className="min-h-[200px] font-mono text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleAnalyze} className="w-full">
        Analyze Queries
      </Button>
    </div>
  );
};