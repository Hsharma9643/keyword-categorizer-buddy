
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Download } from "lucide-react";
import Papa from "papaparse";
import { QueryIntent, EmotionalTone, QueryDepth } from "@/utils/queryClassifier";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface KeywordResult {
  keyword: string;
  intent: QueryIntent;
  emotionalTone: EmotionalTone;
  queryDepth: QueryDepth;
  confidence: number;
}

interface ResultsDisplayProps {
  results: KeywordResult[];
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const copyResults = () => {
    const text = results
      .map((r) => `${r.keyword} - Intent: ${r.intent} (${(r.confidence * 100).toFixed(0)}% confidence), Tone: ${r.emotionalTone}, Depth: ${r.queryDepth}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Results have been copied to your clipboard",
    });
  };

  const downloadResults = () => {
    const csv = Papa.unparse(results.map(result => ({
      Keyword: result.keyword,
      Intent: result.intent,
      Confidence: `${(result.confidence * 100).toFixed(0)}%`,
      "Emotional Tone": result.emotionalTone,
      "Query Depth": result.queryDepth
    })));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'keyword_analysis.csv');
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

  const emotionalToneCounts = results.reduce((acc, curr) => {
    acc[curr.emotionalTone] = (acc[curr.emotionalTone] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const queryDepthCounts = results.reduce((acc, curr) => {
    acc[curr.queryDepth] = (acc[curr.queryDepth] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const intentChartData = Object.entries(intentCounts).map(([name, value]) => ({
    name,
    value,
    originalName: name
  }));

  const emotionalToneChartData = Object.entries(emotionalToneCounts).map(([name, value]) => ({
    name,
    value,
    originalName: name
  }));

  const queryDepthChartData = Object.entries(queryDepthCounts).map(([name, value]) => ({
    name,
    value,
    originalName: name
  }));

  const COLORS = {
    // Intent colors
    explicitLocal: "#8B5CF6", // Electric Violet
    product: "#FEC6A1", // Pumpkin
    service: "#9F9EA1", // Silver
    brand: "#F97316", // Burnt Orange
    featureAttribute: "#403E43", // Facebook Navy Blue
    pricing: "#2F4F4F", // Pine Green
    seasonalPromotional: "#FA8072", // Salmon
    other: "#FEC6A1", // Orange (changed from Oatmeal)
    uncategorized: "#D946EF", // Ultra Violet
    boolean: "#1A1F2C",
    consequence: "#ea384c",
    instruction: "#ADD8E6",
    comparison: "#40E0D0",
    definition: "#3E2723",
    reason: "#E0115F",
    shortFact: "#F4C430",
    // Emotional tone colors
    urgency: "#FF4B4B",
    curiosity: "#4B9EFF",
    concern: "#FFB84B",
    satisfaction: "#4BFF4B",
    frustration: "#FF4B8E",
    neutral: "#A3A3A3",
    // Depth colors
    surface: "#9CA3AF",
    detailed: "#4B5563"
  };

  return (
    <div className="space-y-6">
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Intent Distribution</h3>
          <div className="h-[300px] text-gray-800">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={intentChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={isMobile ? 100 : 80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {intentChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.originalName as keyof typeof COLORS]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                <Legend formatter={(value) => <span style={{ color: '#333' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Emotional Tone Distribution</h3>
          <div className="h-[300px] text-gray-800">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotionalToneChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={isMobile ? 100 : 80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {emotionalToneChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.originalName as keyof typeof COLORS]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                <Legend formatter={(value) => <span style={{ color: '#333' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Query Depth Distribution</h3>
          <div className="h-[300px] text-gray-800">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={queryDepthChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={isMobile ? 100 : 80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {queryDepthChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.originalName as keyof typeof COLORS]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                <Legend formatter={(value) => <span style={{ color: '#333' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-semibold">Classified Queries</h3>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button onClick={downloadResults} variant="outline" size="sm" className="flex-1 sm:flex-initial">
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
              <Button onClick={copyResults} variant="outline" size="sm" className="flex-1 sm:flex-initial">
                Copy Results
              </Button>
            </div>
          </div>
          
          {!isMobile && (
            <div className="flex justify-end gap-2 mb-2 text-sm font-medium text-muted-foreground">
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <span className="w-24 text-center cursor-help">Intent</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>What a user is looking for when they type a keyword into a search engine</p>
                  </TooltipContent>
                </UITooltip>

                <UITooltip>
                  <TooltipTrigger asChild>
                    <span className="w-24 text-center cursor-help">Confidence</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Confidence Score indicates how certain the model is about its classification</p>
                  </TooltipContent>
                </UITooltip>

                <UITooltip>
                  <TooltipTrigger asChild>
                    <span className="w-24 text-center cursor-help">Emotional Tone</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Advanced language pattern recognition to identify sentiment cues such as urgency, curiosity, or neutrality</p>
                  </TooltipContent>
                </UITooltip>

                <UITooltip>
                  <TooltipTrigger asChild>
                    <span className="w-24 text-center cursor-help">Query Depth</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Distinguishes between surface-level and in-depth queries for better content planning</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
          )}

          <div className="space-y-2">
            {results.map((result, index) => (
              <div
                key={index}
                className="p-4 bg-muted rounded-lg space-y-2"
              >
                <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center justify-between'}`}>
                  <span className="font-medium mb-2 sm:mb-0">{result.keyword}</span>
                  <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
                    <div className="flex gap-2 items-center">
                      {isMobile && <span className="text-sm text-muted-foreground w-24">Intent:</span>}
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium w-full sm:w-24 text-center"
                        style={{
                          backgroundColor: COLORS[result.intent],
                          color: result.intent === 'shortFact' ? 'black' : 'white'
                        }}
                      >
                        {result.intent}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      {isMobile && <span className="text-sm text-muted-foreground w-24">Confidence:</span>}
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-white w-full sm:w-24 text-center">
                        {(result.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      {isMobile && <span className="text-sm text-muted-foreground w-24">Tone:</span>}
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-white w-full sm:w-24 text-center"
                        style={{
                          backgroundColor: COLORS[result.emotionalTone]
                        }}
                      >
                        {result.emotionalTone}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      {isMobile && <span className="text-sm text-muted-foreground w-24">Depth:</span>}
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-white w-full sm:w-24 text-center"
                        style={{
                          backgroundColor: COLORS[result.queryDepth]
                        }}
                      >
                        {result.queryDepth}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
