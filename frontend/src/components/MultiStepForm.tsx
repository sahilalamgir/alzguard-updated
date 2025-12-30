import React from "react";
import Step1Form from "./steps/Step1Form";
import Step2Form from "./steps/Step2Form";
import Step3Form from "./steps/Step3Form";
import Step4Form from "./steps/Step4Form";
import Step5Form from "./steps/Step5Form";
import { AssessmentFormData } from "../types/form";

interface Props {
  currentStep: number;
  formData: AssessmentFormData;
  isStepValid: (step: number, data: AssessmentFormData) => boolean;
  onNext: (e: React.MouseEvent) => void;
  onBack: () => void;
  onChange: <K extends keyof AssessmentFormData>(
    field: K,
    value: AssessmentFormData[K]
  ) => void;
  onCheckboxChange: (
    field: "conditionHistory",
    value: AssessmentFormData["conditionHistory"][number]
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const MultiStepForm = ({
  currentStep,
  formData,
  isStepValid,
  onNext,
  onBack,
  onChange,
  onCheckboxChange,
  onSubmit,
  isSubmitting,
}: Props) => {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md p-8">
      {currentStep === 1 && (
        <Step1Form formData={formData} onChange={onChange} />
      )}
      {currentStep === 2 && (
        <Step2Form
          formData={formData}
          onChange={onChange}
          onCheckboxChange={onCheckboxChange}
        />
      )}
      {currentStep === 3 && (
        <Step3Form formData={formData} onChange={onChange} />
      )}
      {currentStep === 4 && (
        <Step4Form formData={formData} onChange={onChange} />
      )}
      {currentStep === 5 && <Step5Form formData={formData} />}

      <div className="flex justify-between mt-8">
        <button
          className="btn-primary disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={onBack}
          disabled={currentStep === 1}
        >
          Back
        </button>
        {currentStep < 5 ? (
          <button
            type="button"
            onClick={(e) => onNext(e)}
            disabled={!isStepValid(currentStep, formData)}
            className="btn-primary disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="btn-primary font-semibold disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
