import { pipeline } from "@huggingface/transformers";

export type QueryIntent = 
  | "boolean" | "consequence" | "instruction" | "comparison"
  | "definition" | "reason" | "shortFact" | "other";

let classifier: any = null;

export const initializeClassifier = async () => {
  if (!classifier) {
    classifier = await pipeline(
      "text-classification",
      "onnx-community/distilbert-base-uncased-finetuned-sst-2-english",
      { device: "cpu" }
    );
  }
  return classifier;
};

const intentMapping: Record<string, QueryIntent> = {
  "LABEL_0": "boolean",
  "LABEL_1": "consequence",
  "LABEL_2": "instruction",
  "LABEL_3": "comparison",
  "LABEL_4": "definition",
  "LABEL_5": "reason",
  "LABEL_6": "shortFact",
  "LABEL_7": "other"
};

export const classifyQuery = async (query: string): Promise<QueryIntent> => {
  try {
    const clf = await initializeClassifier();
    const result = await clf(query);
    console.log("Classification result:", result);
    return intentMapping[result[0].label] || "other";
  } catch (error) {
    console.error("Classification error:", error);
    return "other";
  }
};