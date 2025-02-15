
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MisclassifiedQuery {
  keyword: string;
  classifiedIntent: string;
  timestamp: string;
}

export const ReviewMisclassifications = () => {
  const { toast } = useToast();
  const [logs, setLogs] = React.useState<MisclassifiedQuery[]>([]);

  React.useEffect(() => {
    const storedLogs = localStorage.getItem('misclassifiedQueries');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  const clearLogs = () => {
    localStorage.removeItem('misclassifiedQueries');
    setLogs([]);
    toast({
      title: "Logs Cleared",
      description: "All misclassification logs have been cleared.",
    });
  };

  const downloadLogs = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `misclassified-queries-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (logs.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 mt-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Misclassification Logs</h3>
          <div className="flex gap-2">
            <Button onClick={downloadLogs} variant="outline">
              Download Logs
            </Button>
            <Button onClick={clearLogs} variant="destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          {logs.map((log, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{log.keyword}</p>
                  <p className="text-sm text-muted-foreground">Classified as: {log.classifiedIntent}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
