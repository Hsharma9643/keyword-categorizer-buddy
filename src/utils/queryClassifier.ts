
export type QueryIntent = 
  | "boolean" 
  | "consequence" 
  | "instruction" 
  | "comparison" 
  | "definition" 
  | "reason" 
  | "shortFact" 
  | "other";

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
  emotionalTone: EmotionalTone;
  queryDepth: QueryDepth;
}

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
  
  // Intent classification logic
  let intent: QueryIntent = "other";
  
  // Only classify as boolean if the query STARTS with these words AND has a question structure
  if (
    (query.startsWith("can ") ||
    query.startsWith("is ") ||
    query.startsWith("are ") ||
    query.startsWith("does ") ||
    query.startsWith("do ") ||
    query.startsWith("will ") ||
    query.startsWith("should ")) &&
    query.includes("?")
  ) {
    intent = "boolean";
  } else if (
    query.includes("what happens") ||
    query.includes("outcome") ||
    query.includes("result") ||
    query.includes("effect") ||
    query.includes("impact") ||
    query.includes("lead to")
  ) {
    intent = "consequence";
  } else if (
    query.includes("how to") ||
    query.includes("steps to") ||
    query.includes("guide") ||
    query.includes("tutorial") ||
    query.startsWith("build") ||
    query.startsWith("create") ||
    query.startsWith("make")
  ) {
    intent = "instruction";
  } else if (
    query.includes("vs") ||
    query.includes("versus") ||
    query.includes("compare") ||
    query.includes("difference") ||
    query.includes("better") ||
    query.includes("worse") ||
    query.includes("between")
  ) {
    intent = "comparison";
  } else if (
    query.startsWith("what is") ||
    query.startsWith("what are") ||
    query.includes("meaning") ||
    query.includes("define") ||
    query.includes("definition") ||
    query.includes("explain")
  ) {
    intent = "definition";
  } else if (
    query.startsWith("why") ||
    query.includes("reason") ||
    query.includes("cause") ||
    query.includes("because")
  ) {
    intent = "reason";
  } else if (
    query.startsWith("who") ||
    query.startsWith("when") ||
    query.startsWith("where") ||
    query.startsWith("how many") ||
    query.startsWith("how much") ||
    query.startsWith("which") ||
    query.match(/^what.*(?:date|year|time|number|amount|percentage|rate)/i) ||
    query.match(/^(capital|population|height|weight|distance|size) of/i) ||
    query.match(/^(list|name|give|tell).*(?:countries|cities|people|numbers)/i) ||
    query.match(/^[a-z\s]+ of [a-z\s]+$/i) ||
    query.match(/^(tallest|shortest|biggest|smallest|longest|highest|lowest)/i)
  ) {
    intent = "shortFact";
  }

  return {
    intent,
    emotionalTone: analyzeEmotionalTone(query),
    queryDepth: analyzeQueryDepth(query)
  };
};
