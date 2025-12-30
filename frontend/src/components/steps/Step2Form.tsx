import { AssessmentFormData } from "../../types/form";

interface Props {
  formData: AssessmentFormData;
  onChange: <K extends keyof AssessmentFormData>(
    field: K,
    value: AssessmentFormData[K]
  ) => void;
  onCheckboxChange: (
    field: "conditionHistory",
    value: AssessmentFormData["conditionHistory"][number]
  ) => void;
}

const Step2Form = ({ formData, onChange, onCheckboxChange }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-text-primary font-semibold mb-6">
        Step 2: Health Background
      </h2>
      <div>
        <label htmlFor="familyHistory" className="form-label">
          Does your family have a history of Alzheimer's or dementia?:
        </label>
        <select
          name="familyHistory"
          id="familyHistory"
          value={formData.familyHistory}
          onChange={(e) =>
            onChange(
              "familyHistory",
              e.target.value as AssessmentFormData["familyHistory"]
            )
          }
          className="form-input"
        >
          <option value="">Select an option</option>
          <option value="immediate">Yes (parent/sibling)</option>
          <option value="extended">Yes (extended family)</option>
          <option value="none">No</option>
          <option value="unknown">Unsure</option>
        </select>
      </div>

      <fieldset>
        <legend>Do you have any cardiovascular conditions?:</legend>
        <div>
          <input
            type="checkbox"
            id="hypertension"
            name="hypertension"
            value="hypertension"
            onChange={() =>
              onCheckboxChange("conditionHistory", "hypertension")
            }
            checked={formData.conditionHistory.includes("hypertension")}
            className="form-checkbox"
          ></input>
          <label htmlFor="hypertension">Hypertension</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="diabetes"
            name="diabetes"
            value="diabetes"
            onChange={() => onCheckboxChange("conditionHistory", "diabetes")}
            checked={formData.conditionHistory.includes("diabetes")}
            className="form-checkbox"
          ></input>
          <label htmlFor="diabetes">Diabetes</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="stroke"
            name="stroke"
            value="stroke"
            onChange={() => onCheckboxChange("conditionHistory", "stroke")}
            checked={formData.conditionHistory.includes("stroke")}
            className="form-checkbox"
          ></input>
          <label htmlFor="stroke">Stroke</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="highCholesterol"
            name="highCholesterol"
            value="highCholesterol"
            onChange={() =>
              onCheckboxChange("conditionHistory", "highCholesterol")
            }
            checked={formData.conditionHistory.includes("highCholesterol")}
            className="form-checkbox"
          ></input>
          <label htmlFor="highCholesterol">High cholesterol</label>
        </div>
      </fieldset>

      <div>
        <label htmlFor="smokingHistory" className="form-label">
          What is your smoking history?:
        </label>
        <select
          name="smokingHistory"
          id="smokingHistory"
          value={formData.smokingHistory}
          onChange={(e) =>
            onChange(
              "smokingHistory",
              e.target.value as AssessmentFormData["smokingHistory"]
            )
          }
          className="form-input"
        >
          <option value="">Select an option</option>
          <option value="never">Never</option>
          <option value="former">Former</option>
          <option value="current">Current</option>
        </select>
      </div>
    </div>
  );
};

export default Step2Form;
