
import React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { QueryIntent } from "@/utils/queryClassifier";

interface QueryFeedbackProps {
  keyword: string;
  currentIntent: QueryIntent;
}

export const QueryFeedback = ({ keyword, currentIntent }: QueryFeedbackProps) => {
  const { toast } = useToast();

  const logMisclassification = () => {
    // Get existing logs from localStorage
    const existingLogs = JSON.parse(localStorage.getItem('misclassifiedQueries') || '[]');
    
    // Add new misclassification with timestamp
    const newLog = {
      keyword,
      classifiedIntent: currentIntent,
      timestamp: new Date().toISOString(),
    };
    
    // Add to existing logs
    existingLogs.push(newLog);
    
    // Save back to localStorage
    localStorage.setItem('misclassifiedQueries', JSON.stringify(existingLogs));
    
    toast({
      title: "Feedback Recorded",
      description: "Thank you for your feedback. This will help improve our classification system.",
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={logMisclassification}
      className="text-muted-foreground hover:text-foreground"
      title="Report incorrect classification"
    >
      <ThumbsDown className="h-4 w-4" />
    </Button>
  );
};
