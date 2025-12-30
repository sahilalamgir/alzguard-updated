import { AssessmentFormData, AssessmentResult } from "../types/form";
import { API_ENDPOINTS } from "../config/api";

export const submitAssessment = async (
  data: AssessmentFormData
): Promise<AssessmentResult> => {
  if (data.age === null) {
    throw new Error("Age is required");
  }
  if (data.mriScan === null) {
    throw new Error("MRI scan is required");
  }

  const formData = new FormData();
  formData.append("age", data.age.toString());
  formData.append("sex", data.sex);
  formData.append("educationLevel", data.educationLevel);
  formData.append("primaryLanguage", data.primaryLanguage);
  formData.append("familyHistory", data.familyHistory);
  for (const condition of data.conditionHistory) {
    formData.append("conditionHistory", condition);
  }
  formData.append("smokingHistory", data.smokingHistory);
  formData.append("memoryIssues", data.memoryIssues);
  formData.append("conversationalIssues", data.conversationalIssues);
  formData.append("misplacementIssues", data.misplacementIssues);
  formData.append("mriScan", data.mriScan);
  const response = await fetch(API_ENDPOINTS.assessRisk, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Server error (${response.status}): ${errorText}`);
  }

  return await response.json();
};
