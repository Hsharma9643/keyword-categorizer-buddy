import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export type QueryIntent = 
  | "boolean" | "consequence" | "instruction" | "comparison"
  | "definition" | "reason" | "shortFact" | "opinion"
  | "prediction" | "locationBased" | "temporal" | "hypothetical"
  | "procedural" | "exploratory" | "confirmation" | "creative"
  | "technical" | "emotional" | "entertainment" | "historical"
  | "scientific" | "personal" | "cultural" | "other";

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
    boolean: "#3b82f6",
    consequence: "#10b981",
    instruction: "#8b5cf6",
    comparison: "#f59e0b",
    definition: "#ef4444",
    reason: "#6366f1",
    shortFact: "#14b8a6",
    opinion: "#ec4899",
    prediction: "#84cc16",
    locationBased: "#06b6d4",
    temporal: "#8b5cf6",
    hypothetical: "#f97316",
    procedural: "#0ea5e9",
    exploratory: "#d946ef",
    confirmation: "#22c55e",
    creative: "#eab308",
    technical: "#3b82f6",
    emotional: "#ec4899",
    entertainment: "#f59e0b",
    historical: "#6366f1",
    scientific: "#14b8a6",
    personal: "#d946ef",
    cultural: "#0ea5e9",
    other: "#64748b"
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
                outerRadius={80}
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Classified Keywords</h3>
            <Button onClick={copyResults} variant="outline" size="sm">
              Copy Results
            </Button>
          </div>
          <div className="space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-accent rounded-md"
              >
                <span className="font-medium">{result.keyword}</span>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: COLORS[result.intent],
                    color: '#ffffff',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
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