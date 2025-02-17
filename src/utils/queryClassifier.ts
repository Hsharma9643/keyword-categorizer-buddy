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
    { pattern: /\b(buy|purchase|shop|shopping|order)\b/i, weight: 0.8 },
    { pattern: /\b(product|item|device|gadget|equipment)\b/i, weight: 0.7 },
    { pattern: /\b(laptop|phone|camera|watch|clothing|shoes)\b/i, weight: 0.6 },
    { pattern: /\b(new|latest)\b.*\b(product|item|device)\b/i, weight: 0.9 },
    { pattern: /\b(recommend|suggest)\b.*\b(product|item)\b/i, weight: 0.85 },
    { pattern: /\bwhere\b.*\b(buy|get|find)\b/i, weight: 0.75 }
  ],
  explicitLocal: [
    { pattern: /\bnear\s+me\b/i, weight: 0.9 },
    { pattern: /\b(in|at|around|near)\s+[A-Z][a-z]+/i, weight: 0.8 },
    { pattern: /\b(local|nearby|closest)\b/i, weight: 0.7 },
    { pattern: /\b(city|town|state|country|region)\b/i, weight: 0.6 },
    { pattern: /\bwithin\s+\d+\s+(miles|km|kilometers)\b/i, weight: 0.85 },
    { pattern: /\blocal\s+area\b/i, weight: 0.75 }
  ],
  service: [
    { pattern: /\b(service|provider|consultant|agency)\b/i, weight: 0.8 },
    { pattern: /\b(repair|maintenance|installation|support)\b/i, weight: 0.7 },
    { pattern: /\bhow\s+to\s+get\b/i, weight: 0.6 },
    { pattern: /\bwho\s+can\b/i, weight: 0.6 },
    { pattern: /\b(hire|book|schedule)\b.*\b(service|provider)\b/i, weight: 0.85 },
    { pattern: /\b(need|looking\s+for)\b.*\b(service|help)\b/i, weight: 0.75 }
  ],
  brand: [
    { pattern: /\b(brand|manufacturer|company|vendor)\b/i, weight: 0.7 },
    { pattern: /\b(nike|adidas|apple|samsung|google|amazon)\b/i, weight: 0.9 },
    { pattern: /\b(adschoolmaster|backlinko|ahrefs|semrush)\b/i, weight: 0.95 },
    { pattern: /\b(reebok|puma|under\s*armour|new\s*balance)\b/i, weight: 0.9 },
    { pattern: /[A-Z][a-z]+'s\b/i, weight: 0.6 },
    { pattern: /\bby\s+[A-Z][a-z]+\b/i, weight: 0.65 },
    { pattern: /\b(official|authorized)\b.*\b(dealer|retailer|store)\b/i, weight: 0.8 }
  ],
  featureAttribute: [
    { pattern: /\b(feature|specification|characteristic|property)\b/i, weight: 0.8 },
    { pattern: /\b(size|color|weight|height|width|length)\b/i, weight: 0.7 },
    { pattern: /\b(vegan|organic|wireless|waterproof|sustainable)\b/i, weight: 0.7 },
    { pattern: /\b(made|built|designed)\b.*\b(with|from|using)\b/i, weight: 0.75 },
    { pattern: /\b(what|which)\b.*\b(features|specs)\b/i, weight: 0.85 }
  ],
  pricing: [
    { pattern: /\b(price|cost|fee|rate|pricing)\b/i, weight: 0.8 },
    { pattern: /\b(cheap|expensive|affordable|budget)\b/i, weight: 0.7 },
    { pattern: /\bhow\s+much\b/i, weight: 0.9 },
    { pattern: /\$|\$[0-9]+/i, weight: 0.9 },
    { pattern: /\b(under|over|between)\b.*\$\d+/i, weight: 0.85 },
    { pattern: /\b(price|cost)\b.*\b(range|comparison)\b/i, weight: 0.8 }
  ],
  seasonalPromotional: [
    { pattern: /\b(sale|discount|deal|offer|promotion)\b/i, weight: 0.8 },
    { pattern: /\b(christmas|halloween|black\s+friday|cyber\s+monday)\b/i, weight: 0.9 },
    { pattern: /\b(season|seasonal|holiday|festival)\b/i, weight: 0.7 },
    { pattern: /\b(special|limited\s+time)\b.*\b(offer|deal)\b/i, weight: 0.85 },
    { pattern: /\b(early|exclusive)\b.*\b(access|discount)\b/i, weight: 0.8 }
  ],
  boolean: [
    { pattern: /^(can|is|are|does|do|will|should)\b.*\?$/i, weight: 0.9 },
    { pattern: /\b(possible|allowed|available)\b/i, weight: 0.7 },
    { pattern: /^(yes|no)\b.*\b(question|answer)\b/i, weight: 0.8 },
    { pattern: /\b(true|false)\b.*\b(statement|claim)\b/i, weight: 0.85 }
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
  let contextualBoost = 1;

  // Convert query to lowercase for case-insensitive matching
  query = query.toLowerCase();

  // Additional context rules
  if (query.length > 50) contextualBoost *= 1.1; // Longer queries often have more context
  if (query.includes('?')) contextualBoost *= 1.05; // Questions are often more intentful
  if (/\b(need|want|looking for)\b/i.test(query)) contextualBoost *= 1.15; // Direct intent indicators

  patterns.forEach(({ pattern, weight }) => {
    const isMatch = typeof pattern === 'string' 
      ? query.includes(pattern.toLowerCase())
      : pattern.test(query);
    
    if (isMatch) {
      matches++;
      totalWeight += weight;
      maxConfidence = Math.max(maxConfidence, weight);
    }
  });

  // If no matches found, return 0
  if (matches === 0) return 0;
  
  // Calculate weighted score
  const matchRatio = totalWeight / patterns.length;
  const baseConfidence = 0.7 * maxConfidence + 0.3 * matchRatio;
  
  // Apply contextual boost and ensure confidence doesn't exceed 1
  return Math.min(baseConfidence * contextualBoost, 1);
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
