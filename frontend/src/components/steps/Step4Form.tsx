import { useState, useEffect } from "react";
import { AssessmentFormData } from "../../types/form";

interface Props {
  formData: AssessmentFormData;
  onChange: <K extends keyof AssessmentFormData>(
    field: K,
    value: AssessmentFormData[K]
  ) => void;
}

const Step4Form = ({ formData, onChange }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (formData.mriScan) {
      const url = URL.createObjectURL(formData.mriScan);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [formData.mriScan]);

  return (
    <div>
      <h2 className="text-2xl text-text-primary font-semibold mb-6">
        Step 4: Upload MRI Scan
      </h2>
      {previewUrl && (
        <div>
          <img alt="MRI Scan Preview" src={previewUrl} className="w-full" />
          <button
            type="button"
            onClick={() => onChange("mriScan", null)}
            className="btn-primary"
          >
            Remove
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onChange("mriScan", file);
          }
        }}
      />
    </div>
  );
};

export default Step4Form;
