// Better naming: avoid conflict with built-in FormData by being more specific
export interface AssessmentFormData {
  // Step 1 - Demographics
  age: number | null;  // ← number, not string! null when empty
  sex: "male" | "female" | "unspecified" | "";
  educationLevel:
    | "lessThanHighSchool"
    | "highSchool"
    | "undergraduate"
    | "graduate"
    | "";
  primaryLanguage: "english" | "french" | "spanish" | "";

  // Step 2 - Health
  familyHistory: "immediate" | "extended" | "none" | "unknown" | "";
  conditionHistory: Array<
    "hypertension" | "diabetes" | "stroke" | "high cholesterol"
  >;
  smokingHistory: "never" | "former" | "current" | "";

  // Step 3 - Cognitive
  memoryIssues: "never" | "sometimes" | "often" | "always" | "";
  conversationalIssues: "never" | "sometimes" | "often" | "always" | "";
  misplacementIssues: "never" | "sometimes" | "often" | "always" | "";

  // Step 4 - MRI
  mriScan: File | null;
}

export interface AssessmentResult {
  labels: string[];
  probabilities: number[];
  predicted_label: string;
  confidence: number;
  final_score: number;
  risk: "low" | "moderate" | "high";
}

export interface ChartDataPoint {
  label: string;
  probability: number;
}
