import React, { useState } from "react";
import MultiStepForm from "../components/MultiStepForm";

const FormPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: About You
    age: "",
    sex: "",
    educationLevel: "",
    primaryLanguage: "",
    // Step 2: Health Background
    familyHistory: "",
    diseaseHistory: [],
    smokingHistory: "",
    // Step 3: Cognitive Experience
    memoryIssues: "",
    conversationalIssues: "",
    misplacementIssues: "",
  });

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleCheckboxChange = (field: string, value: string) => {
    if (formData[field].includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((item: string) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: [...prev[field], value] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(currentStep, formData);
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
      <MultiStepForm
        currentStep={currentStep}
        formData={formData}
        onNext={handleNext}
        onBack={handleBack}
        onChange={handleChange}
        onCheckboxChange={handleCheckboxChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormPage;
