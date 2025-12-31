import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  isStepValid,
} from "./formValidation";
import { AssessmentFormData } from "../types/form";

describe("Form Validation", () => {
  const createMockData = (
    overrides?: Partial<AssessmentFormData>
  ): AssessmentFormData => ({
    age: 65,
    sex: "male",
    educationLevel: "graduate",
    primaryLanguage: "english",
    familyHistory: "none",
    conditionHistory: ["highCholesterol", "stroke"],
    smokingHistory: "never",
    memoryIssues: "never",
    conversationalIssues: "never",
    misplacementIssues: "never",
    mriScan: new File([], "test.jpg", { type: "image/jpeg" }),
    ...overrides,
  });

  describe("validateStep1", () => {
    it("returns true when all Step 1 fields are valid", () => {
      const data = createMockData();
      expect(validateStep1(data)).toBe(true);
    });

    test.each<[string, Partial<AssessmentFormData>]>([
      ["age", { age: null }],
      ["sex", { sex: "" }],
      ["educationLevel", { educationLevel: "" }],
      ["primaryLanguage", { primaryLanguage: "" }],
    ])("returns false when %s is invalid", (_, override) => {
      const data = createMockData(override);
      expect(validateStep1(data)).toBe(false);
    });
  });

  describe("validateStep2", () => {
    it("returns true when all Step 2 fields are valid", () => {
      const data = createMockData();
      expect(validateStep2(data)).toBe(true);
    });

    it("returns true even when conditionHistory is empty", () => {
      const data = createMockData({ conditionHistory: [] });
      expect(validateStep2(data)).toBe(true);
    });

    test.each<[string, Partial<AssessmentFormData>]>([
      ["familyHistory", { familyHistory: "" }],
      ["smokingHistory", { smokingHistory: "" }],
    ])("returns false when %s is invalid", (_, override) => {
      const data = createMockData(override);
      expect(validateStep2(data)).toBe(false);
    });
  });

  describe("validateStep3", () => {
    it("returns true when all Step 3 fields are valid", () => {
      const data = createMockData();
      expect(validateStep3(data)).toBe(true);
    });

    test.each<[string, Partial<AssessmentFormData>]>([
      ["memoryIssues", { memoryIssues: "" }],
      ["conversationalIssues", { conversationalIssues: "" }],
      ["misplacementIssues", { misplacementIssues: "" }],
    ])("returns false when %s is invalid", (_, override) => {
      const data = createMockData(override);
      expect(validateStep3(data)).toBe(false);
    });
  });

  describe("validateStep4", () => {
    it("returns true when mriScan exists", () => {
      const data = createMockData();
      expect(validateStep4(data)).toBe(true);
    });

    it("returns false when mriScan is null", () => {
      const data = createMockData({ mriScan: null });
      expect(validateStep4(data)).toBe(false);
    });
  });

  describe("isStepValid", () => {
    test.each<[number, Partial<AssessmentFormData>, boolean]>([
      [1, { age: null }, false],
      [1, {}, true],
      [2, { familyHistory: "" }, false],
      [2, {}, true],
      [3, { memoryIssues: "" }, false],
      [3, {}, true],
      [4, { mriScan: null }, false],
      [4, {}, true],
    ])("validates step %i correctly (valid=%s)", (step, override, expected) => {
      const data = createMockData(override);
      expect(isStepValid(step, data)).toBe(expected);
    });

    test.each([[0], [5], [99], [-1]])(
      "returns false for invalid step number %i",
      (step) => {
        const data = createMockData();
        expect(isStepValid(step, data)).toBe(false);
      }
    );
  });
});
