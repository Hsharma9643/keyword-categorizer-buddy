export type QueryIntent = 
  | "boolean" 
  | "consequence" 
  | "instruction" 
  | "comparison" 
  | "definition" 
  | "reason" 
  | "shortFact"
  | "explicitLocal"
  | "product"
  | "service"
  | "brand"
  | "featureAttribute"
  | "pricing"
  | "seasonalPromotional" 
  | "other"
  | "uncategorized";

export type EmotionalTone = 
  | "urgency"
  | "curiosity"
  | "concern"
  | "satisfaction"
  | "frustration"
  | "neutral";

export type QueryDepth = "surface" | "detailed";

export interface QueryAnalysis {
  intent: QueryIntent;
  confidence: number;
  emotionalTone: EmotionalTone;
  queryDepth: QueryDepth;
}

interface PatternMatch {
  pattern: RegExp | string;
  weight: number;
}

const intentPatterns: Record<QueryIntent, PatternMatch[]> = {
  product: [
    { pattern: /\b(buy|purchase|shop|shopping|order)\b/, weight: 0.8 },
    { pattern: /\b(product|item|device|gadget|equipment)\b/, weight: 0.7 },
    { pattern: /\b(laptop|phone|camera|watch|clothing|shoes)\b/, weight: 0.6 },
    { pattern: /\b(new|latest)\b.*\b(product|item|device)\b/, weight: 0.9 }
  ],
  explicitLocal: [
    { pattern: "near me", weight: 0.9 },
    { pattern: /\b(in|at|around|near) [A-Z][a-z]+/, weight: 0.8 },
    { pattern: /\b(local|nearby|closest)\b/, weight: 0.7 },
    { pattern: /\b(city|town|state|country|region)\b/, weight: 0.6 }
  ],
  service: [
    { pattern: /\b(service|provider|consultant|agency)\b/, weight: 0.8 },
    { pattern: /\b(repair|maintenance|installation|support)\b/, weight: 0.7 },
    { pattern: "how to get", weight: 0.6 },
    { pattern: "who can", weight: 0.6 }
  ],
  brand: [
    { pattern: /\b(brand|manufacturer|company|vendor)\b/, weight: 0.7 },
    { pattern: /\b(nike|adidas|apple|samsung|google|amazon)\b/, weight: 0.9 },
    { pattern: /[A-Z][a-z]+'s/, weight: 0.6 }
  ],
  featureAttribute: [
    { pattern: /\b(feature|specification|characteristic|property)\b/, weight: 0.8 },
    { pattern: /\b(size|color|weight|height|width|length)\b/, weight: 0.7 },
    { pattern: /\b(vegan|organic|wireless|waterproof|sustainable)\b/, weight: 0.7 }
  ],
  pricing: [
    { pattern: /\b(price|cost|fee|rate|pricing)\b/, weight: 0.8 },
    { pattern: /\b(cheap|expensive|affordable|budget)\b/, weight: 0.7 },
    { pattern: "how much", weight: 0.9 },
    { pattern: /\$|\$[0-9]+/, weight: 0.9 }
  ],
  seasonalPromotional: [
    { pattern: /\b(sale|discount|deal|offer|promotion)\b/, weight: 0.8 },
    { pattern: /\b(christmas|halloween|black friday|cyber monday)\b/, weight: 0.9 },
    { pattern: /\b(season|seasonal|holiday|festival)\b/, weight: 0.7 }
  ],
  boolean: [
    { pattern: /^(can|is|are|does|do|will|should) .*\?$/, weight: 0.9 },
    { pattern: /\b(possible|allowed|available)\b/, weight: 0.7 }
  ],
  consequence: [
    { pattern: "what happens", weight: 0.9 },
    { pattern: /\b(outcome|result|effect|impact)\b/, weight: 0.8 },
    { pattern: "lead to", weight: 0.7 }
  ],
  instruction: [
    { pattern: "how to", weight: 0.9 },
    { pattern: /\b(steps|guide|tutorial)\b/, weight: 0.8 },
    { pattern: /^(build|create|make)/, weight: 0.7 }
  ],
  comparison: [
    { pattern: /\b(vs|versus|compare|difference)\b/, weight: 0.9 },
    { pattern: /\b(better|worse|between)\b/, weight: 0.7 },
    { pattern: /\b(compared to|over|or)\b/, weight: 0.6 }
  ],
  definition: [
    { pattern: /^what (is|are)/, weight: 0.9 },
    { pattern: /\b(meaning|define|definition|explain)\b/, weight: 0.8 }
  ],
  reason: [
    { pattern: /^why/, weight: 0.9 },
    { pattern: /\b(reason|cause|because)\b/, weight: 0.8 }
  ],
  shortFact: [
    { pattern: /^(who|when|where|how many|which)/, weight: 0.9 },
    { pattern: /^what.*(?:date|year|time|number)/, weight: 0.8 },
    { pattern: /^(capital|population|height|weight) of/, weight: 0.8 }
  ],
  other: [
    { pattern: /.+/, weight: 0.3 } // Catch-all with low confidence
  ],
  uncategorized: [
    { pattern: /.+/, weight: 0.1 } // Lowest confidence for uncategorized
  ]
};

const calculateConfidence = (query: string, patterns: PatternMatch[]): number => {
  let maxConfidence = 0;
  let matches = 0;
  let totalWeight = 0;

  patterns.forEach(({ pattern, weight }) => {
    const isMatch = typeof pattern === 'string' 
      ? query.includes(pattern)
      : pattern.test(query);
    
    if (isMatch) {
      matches++;
      totalWeight += weight;
      maxConfidence = Math.max(maxConfidence, weight);
    }
  });

  // Calculate final confidence score
  if (matches === 0) return 0;
  
  // Weighted average between highest single match and overall match ratio
  const matchRatio = totalWeight / patterns.length;
  return Math.min(0.7 * maxConfidence + 0.3 * matchRatio, 1);
};

const analyzeEmotionalTone = (query: string): EmotionalTone => {
  query = query.toLowerCase();
  
  // Urgency patterns
  if (
    query.includes("urgent") ||
    query.includes("immediately") ||
    query.includes("asap") ||
    query.includes("emergency") ||
    query.includes("quick")
  ) {
    return "urgency";
  }

  // Curiosity patterns
  if (
    query.startsWith("how") ||
    query.startsWith("why") ||
    query.includes("curious") ||
    query.includes("wonder") ||
    query.includes("difference between")
  ) {
    return "curiosity";
  }

  // Concern patterns
  if (
    query.includes("worried") ||
    query.includes("problem") ||
    query.includes("issue") ||
    query.includes("risk") ||
    query.includes("danger")
  ) {
    return "concern";
  }

  // Satisfaction patterns
  if (
    query.includes("best") ||
    query.includes("recommend") ||
    query.includes("top") ||
    query.includes("great") ||
    query.includes("favorite")
  ) {
    return "satisfaction";
  }

  // Frustration patterns
  if (
    query.includes("wrong") ||
    query.includes("bad") ||
    query.includes("fail") ||
    query.includes("worst") ||
    query.includes("terrible")
  ) {
    return "frustration";
  }

  return "neutral";
};

const analyzeQueryDepth = (query: string): QueryDepth => {
  const words = query.split(" ");
  const hasMultipleQuestions = query.split("?").length > 2;
  const hasDetailedQualifiers = 
    query.includes("specifically") ||
    query.includes("in detail") ||
    query.includes("step by step") ||
    query.includes("compared to") ||
    query.includes("difference between");

  // Consider a query detailed if it's longer than 6 words OR contains multiple questions
  // OR uses detailed qualifiers
  if (words.length > 6 || hasMultipleQuestions || hasDetailedQualifiers) {
    return "detailed";
  }

  return "surface";
};

export const classifyQuery = async (query: string): Promise<QueryAnalysis> => {
  query = query.toLowerCase();
  
  // Calculate confidence for each intent
  const intentScores = Object.entries(intentPatterns).map(([intent, patterns]) => ({
    intent: intent as QueryIntent,
    confidence: calculateConfidence(query, patterns)
  }));

  // Sort by confidence and get the highest scoring intent
  const sortedScores = intentScores.sort((a, b) => b.confidence - a.confidence);
  const topIntent = sortedScores[0];

  // If confidence is very low, mark as uncategorized
  const finalIntent = topIntent.confidence < 0.3 ? {
    intent: 'uncategorized' as QueryIntent,
    confidence: 0.1
  } : topIntent;

  return {
    intent: finalIntent.intent,
    confidence: Number(finalIntent.confidence.toFixed(2)),
    emotionalTone: analyzeEmotionalTone(query),
    queryDepth: analyzeQueryDepth(query)
  };
};
