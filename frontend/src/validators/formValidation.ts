import { AssessmentFormData } from "../types/form";

/**
 * Validates Step 1 fields (Demographics)
 * @param data - Form data to validate
 * @returns true if all required Step 1 fields are filled
 */
export const validateStep1 = (data: AssessmentFormData): boolean => {
  return !(
    data.age === null ||
    data.sex === "" ||
    data.educationLevel === "" ||
    data.primaryLanguage === ""
  );
};

/**
 * Validates Step 2 fields (Health Background)
 * @param data - Form data to validate
 * @returns true if all required Step 2 fields are filled
 */
export const validateStep2 = (data: AssessmentFormData): boolean => {
  return !(data.familyHistory === "" || data.smokingHistory === "");
};

/**
 * Validates Step 3 fields (Cognitive Experience)
 * @param data - Form data to validate
 * @returns true if all required Step 3 fields are filled
 */
export const validateStep3 = (data: AssessmentFormData): boolean => {
  return !(
    data.memoryIssues === "" ||
    data.conversationalIssues === "" ||
    data.misplacementIssues === ""
  );
};

/**
 * Validates Step 4 fields (MRI Upload)
 * @param data - Form data to validate
 * @returns true if MRI scan is uploaded
 */
export const validateStep4 = (data: AssessmentFormData): boolean => {
  return !(data.mriScan === null);
};

export const isStepValid = (step: number, data: AssessmentFormData): boolean => {
  switch (step) {
    case 1:
      return validateStep1(data);
    case 2:
      return validateStep2(data);
    case 3:
      return validateStep3(data);
    case 4:
      return validateStep4(data);
    default:
      return false;
  }
};
