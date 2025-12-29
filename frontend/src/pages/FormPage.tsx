import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "../components/MultiStepForm";
import { FormData as FormType, AssessmentResult } from "../types/form";

const FormPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Step 1: About You
    age: "",
    sex: "",
    educationLevel: "",
    primaryLanguage: "",
    // Step 2: Health Background
    familyHistory: "",
    conditionHistory: [] as string[],
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
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleCheckboxChange = (field: string, value: any) => {
    if ((formData[field] as string[]).includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((item: string) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: [...prev[field], value] }));
    }
  };
  const isCurrentStepValid = () => {
    return (
      (currentStep === 1 && isStep1Valid()) ||
      (currentStep === 2 && isStep2Valid()) ||
      (currentStep === 3 && isStep3Valid()) ||
      (currentStep === 4 && isStep4Valid())
    );
  };
  const isStep1Valid = () => {
    return !(
      formData.age === null ||
      formData.sex === "" ||
      formData.educationLevel === "" ||
      formData.primaryLanguage === ""
    );
  };
  const isStep2Valid = () => {
    return !(formData.familyHistory === "" || formData.smokingHistory === "");
  };
  const isStep3Valid = () => {
    return !(
      formData.memoryIssues === "" ||
      formData.conversationalIssues === "" ||
      formData.misplacementIssues === ""
    );
  };
  const isStep4Valid = () => {
    return !(formData.mriScan === null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setError(null);
    console.log("formData:", formData);
    try {
      const finalFormData = new FormData();
      finalFormData.append("age", formData.age);
      finalFormData.append("sex", formData.sex);
      finalFormData.append("educationLevel", formData.educationLevel);
      finalFormData.append("primaryLanguage", formData.primaryLanguage);
      finalFormData.append("familyHistory", formData.familyHistory);
      for (const condition of formData.conditionHistory) {
        finalFormData.append("conditionHistory", condition);
      }
      finalFormData.append("smokingHistory", formData.smokingHistory);
      finalFormData.append("memoryIssues", formData.memoryIssues);
      finalFormData.append(
        "conversationalIssues",
        formData.conversationalIssues
      );
      finalFormData.append("misplacementIssues", formData.misplacementIssues);
      finalFormData.append("mriScan", formData.mriScan);
      const response = await fetch("http://127.0.0.1:8000/assess-risk", {
        method: "POST",
        body: finalFormData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }

      let data: AssessmentResult;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error("Invalid response from server");
      }

      console.log(data);

      navigate("/results", {
        state: data,
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
        isCurrentStepValid={isCurrentStepValid}
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
