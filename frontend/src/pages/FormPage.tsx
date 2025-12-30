import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "../components/MultiStepForm";
import { isStepValid } from "../validators/formValidation";
import { AssessmentFormData } from "../types/form";
import { submitAssessment } from "../services/api";

const FormPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<AssessmentFormData>({
    // Step 1: About You
    age: null,
    sex: "",
    educationLevel: "",
    primaryLanguage: "",
    // Step 2: Health Background
    familyHistory: "",
    conditionHistory: [],
    smokingHistory: "",
    // Step 3: Cognitive Experience
    memoryIssues: "",
    conversationalIssues: "",
    misplacementIssues: "",
    // Step 4: MRI Upload
    mriScan: null,
  });

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleChange = <K extends keyof AssessmentFormData>(
    field: K,
    value: AssessmentFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (
    field: "conditionHistory",
    value: AssessmentFormData["conditionHistory"][number]
  ) => {
    if (formData[field].includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: [...prev[field], value] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitAssessment(formData);
      navigate("/results", {
        state: result,
      });
    } catch (err) {
      if (err instanceof TypeError && err.message == "Failed to fetch") {
        setError(
          "Unable to connect to server. Please check your connection and try again."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-text-primary text-3xl font-semibold mb-3">
          Alzheimer's Risk Assessment
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          Help us understand your cognitive health. This screening is private
          and takes about 5 minutes.
        </p>
      </div>

      {error && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      )}

      <MultiStepForm
        currentStep={currentStep}
        formData={formData}
        isStepValid={isStepValid}
        onNext={handleNext}
        onBack={handleBack}
        onChange={handleChange}
        onCheckboxChange={handleCheckboxChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default FormPage;
