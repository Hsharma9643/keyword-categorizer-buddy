
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Download } from "lucide-react";
import Papa from "papaparse";

export type QueryIntent = 
  | "boolean" 
  | "consequence" 
  | "instruction" 
  | "comparison"
  | "definition" 
  | "reason" 
  | "shortFact" 
  | "other";

export interface KeywordResult {
  keyword: string;
  intent: QueryIntent;
}

interface ResultsDisplayProps {
  results: KeywordResult[];
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const { toast } = useToast();

  const copyResults = () => {
    const text = results
      .map((r) => `${r.keyword} - ${r.intent.toUpperCase()}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Results have been copied to your clipboard",
    });
  };

  const downloadResults = () => {
    // Convert results to CSV format
    const csv = Papa.unparse(results.map(result => ({
      Keyword: result.keyword,
      Intent: result.intent.charAt(0).toUpperCase() + result.intent.slice(1)
    })));

    // Create blob and download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'keyword_intent_analysis.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: "Your results are being downloaded as a CSV file",
      });
    }
  };

  const intentCounts = results.reduce((acc, curr) => {
    acc[curr.intent] = (acc[curr.intent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(intentCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    originalName: name // Keep the original name for color mapping
  }));

  const COLORS = {
    boolean: "#1A1F2C",     // Dark Purple
    consequence: "#ea384c", // Cardinal Red alternative
    instruction: "#ADD8E6", // Ice Blue
    comparison: "#40E0D0",  // Caribbean Green
    definition: "#3E2723",  // Dark Brown
    reason: "#E0115F",      // Ruby color
    shortFact: "#F4C430",   // Saffron
    other: "#8B5CF6"        // Vivid Purple
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="h-[300px] text-gray-800">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.originalName as keyof typeof COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Legend formatter={(value) => <span style={{ color: '#333' }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Classified Queries</h3>
            <div className="flex gap-2">
              <Button onClick={downloadResults} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
              <Button onClick={copyResults} variant="outline" size="sm">
                Copy Results
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <span className="font-medium">{result.keyword}</span>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: COLORS[result.intent],
                    color: result.intent === 'shortFact' ? 'black' : 'white'
                  }}
                >
                  {result.intent.charAt(0).toUpperCase() + result.intent.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

