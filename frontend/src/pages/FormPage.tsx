import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "../components/MultiStepForm";

const FormPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: About You
    age: "",
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
  const isCurrentStepValid = () => {
    return (
      (currentStep === 1 && isStep1Valid()) ||
      (currentStep === 2 && isStep2Valid()) ||
      (currentStep === 3 && isStep3Valid())
    );
  };
  const isStep1Valid = () => {
    return !(
      formData.age === "" ||
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData:", formData);
    const response = await fetch("http://127.0.0.1:8000/assessment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    // console.log("Scoree:", data.final_score);
    // if (data.final_score <= 3) {
    //   console.log("low");
    // } else if (data.final_score <= 7) {
    //   console.log("moderate");
    // } else {
    //   console.log("high");
    // }

    navigate("/results", {
      state: data,
    });
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
        isCurrentStepValid={isCurrentStepValid}
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
