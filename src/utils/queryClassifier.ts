export type QueryIntent = 
  | "boolean" 
  | "consequence" 
  | "instruction" 
  | "comparison"
  | "definition" 
  | "reason" 
  | "shortFact" 
  | "other";

export const classifyQuery = async (query: string): Promise<QueryIntent> => {
  query = query.toLowerCase();
  
  // Boolean questions (yes/no)
  if (
    query.startsWith("can") ||
    query.startsWith("is") ||
    query.startsWith("are") ||
    query.startsWith("does") ||
    query.startsWith("do") ||
    query.startsWith("will") ||
    query.startsWith("should")
  ) {
    return "boolean";
  }

  // Consequence patterns
  if (
    query.includes("what happens") ||
    query.includes("outcome") ||
    query.includes("result") ||
    query.includes("effect") ||
    query.includes("impact") ||
    query.includes("lead to")
  ) {
    return "consequence";
  }

  // Instruction patterns
  if (
    query.includes("how to") ||
    query.includes("steps to") ||
    query.includes("guide") ||
    query.includes("tutorial") ||
    query.startsWith("build") ||
    query.startsWith("create") ||
    query.startsWith("make")
  ) {
    return "instruction";
  }

  // Comparison patterns
  if (
    query.includes("vs") ||
    query.includes("versus") ||
    query.includes("compare") ||
    query.includes("difference") ||
    query.includes("better") ||
    query.includes("worse") ||
    query.includes("between")
  ) {
    return "comparison";
  }

  // Definition patterns
  if (
    query.startsWith("what is") ||
    query.startsWith("what are") ||
    query.includes("meaning") ||
    query.includes("define") ||
    query.includes("definition") ||
    query.includes("explain")
  ) {
    return "definition";
  }

  // Reason patterns
  if (
    query.startsWith("why") ||
    query.includes("reason") ||
    query.includes("cause") ||
    query.includes("because")
  ) {
    return "reason";
  }

  // Short Fact patterns - Updated with more precise patterns
  if (
    query.startsWith("who") ||
    query.startsWith("when") ||
    query.startsWith("where") ||
    query.startsWith("how many") ||
    query.startsWith("how much") ||
    query.startsWith("which") ||
    query.match(/^what.*(?:date|year|time|number|amount|percentage|rate)/i) ||
    query.match(/^(capital|population|height|weight|distance|size) of/i) ||
    query.match(/^(list|name|give|tell).*(?:countries|cities|people|numbers)/i) ||
    // Match queries that look like they're asking for a direct fact
    query.match(/^[a-z\s]+ of [a-z\s]+$/i) || // e.g. "capital of France"
    query.match(/^(tallest|shortest|biggest|smallest|longest|highest|lowest)/i)
  ) {
    return "shortFact";
  }

  // Default to other
  return "other";
};