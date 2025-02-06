import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export type QueryIntent = 
  | "boolean" | "consequence" | "instruction" | "comparison"
  | "definition" | "reason" | "shortFact" | "other";

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

  const intentCounts = results.reduce((acc, curr) => {
    acc[curr.intent] = (acc[curr.intent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(intentCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const COLORS = {
    boolean: "#22c55e",     // Green
    consequence: "#15803d", // Dark Green
    instruction: "#86efac", // Light Green
    comparison: "#4ade80",  // Medium Green
    definition: "#16a34a",  // Forest Green
    reason: "#166534",      // Deep Green
    shortFact: "#bbf7d0",   // Pale Green
    other: "#dcfce7"        // Mint Green
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="h-[300px]">
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
                    fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Classified Queries</h3>
            <Button onClick={copyResults} variant="outline" size="sm">
              Copy Results
            </Button>
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
                    color: COLORS[result.intent],
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