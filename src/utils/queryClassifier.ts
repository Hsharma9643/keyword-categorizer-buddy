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

  // Short Fact patterns
  if (
    query.startsWith("who") ||
    query.startsWith("when") ||
    query.startsWith("where") ||
    query.startsWith("how many") ||
    query.startsWith("how much") ||
    query.includes("list") ||
    query.includes("name")
  ) {
    return "shortFact";
  }

  // Default to other
  return "other";
};