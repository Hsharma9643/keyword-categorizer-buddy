export type QueryIntent = 
  | "informational" 
  | "navigational" 
  | "transactional" 
  | "commercial";

// Simple rule-based classifier similar to the reference app
export const classifyQuery = async (query: string): Promise<QueryIntent> => {
  query = query.toLowerCase();
  
  // Transactional patterns
  if (
    query.includes("buy") ||
    query.includes("purchase") ||
    query.includes("order") ||
    query.includes("shop") ||
    query.includes("deal") ||
    query.includes("price") ||
    query.includes("cost")
  ) {
    return "transactional";
  }

  // Commercial patterns
  if (
    query.includes("best") ||
    query.includes("review") ||
    query.includes("compare") ||
    query.includes("vs") ||
    query.includes("versus") ||
    query.includes("top") ||
    query.includes("cheap") ||
    query.includes("cheapest")
  ) {
    return "commercial";
  }

  // Navigational patterns
  if (
    query.includes("login") ||
    query.includes("sign in") ||
    query.includes("website") ||
    query.includes("site") ||
    query.includes(".com") ||
    query.includes(".org") ||
    query.includes(".net") ||
    query.includes("official")
  ) {
    return "navigational";
  }

  // Default to informational
  return "informational";
};