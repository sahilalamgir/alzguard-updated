import React from "react";
import Step1Form from "./steps/Step1Form";
import Step2Form from "./steps/Step2Form";
import Step3Form from "./steps/Step3Form";
import Step4Form from "./steps/Step4Form";
import Step5Form from "./steps/Step5Form";

interface Props {
  currentStep: number;
  formData: any;
  isCurrentStepValid: () => boolean;
  onNext: (e: React.MouseEvent) => void;
  onBack: () => void;
  onChange: (field: string, value: any) => void;
  onCheckboxChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const MultiStepForm = ({
  currentStep,
  formData,
  isCurrentStepValid,
  onNext,
  onBack,
  onChange,
  onCheckboxChange,
  onSubmit,
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
            disabled={!isCurrentStepValid()}
            className="btn-primary disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Next
          </button>
        ) : (
          <button type="submit" className="btn-primary font-semibold">
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
