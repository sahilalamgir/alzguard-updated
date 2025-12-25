interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
  onCheckboxChange: (field: string, value: any) => void;
}

const Step2Form = ({ formData, onChange, onCheckboxChange }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-text-primary font-semibold mb-6">
        Step 2: Health Background
      </h2>
      <div>
        <label htmlFor="familyHistory" className="form-label">
          Does your family have history of Alzheimer's or dementia?:
        </label>
        <select
          name="familyHistory"
          id="familyHistory"
          value={formData.familyHistory}
          onChange={(e) => onChange("familyHistory", e.target.value)}
          className="form-input"
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="unsure">Unsure</option>
        </select>
      </div>

      <fieldset>
        <legend>What is your medical history?:</legend>
        <div>
          <input
            type="checkbox"
            id="cardiovascular"
            name="cardiovascular"
            value="cardiovascular"
            onChange={() =>
              onCheckboxChange("diseaseHistory", "cardiovascular")
            }
            checked={formData.diseaseHistory.includes("cardiovascular")}
            className="form-checkbox"
          ></input>
          <label htmlFor="cardiovascular">Cardiovascular disease</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="diabetes"
            name="diabetes"
            value="diabetes"
            onChange={() => onCheckboxChange("diseaseHistory", "diabetes")}
            checked={formData.diseaseHistory.includes("diabetes")}
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
            onChange={() => onCheckboxChange("diseaseHistory", "stroke")}
            checked={formData.diseaseHistory.includes("stroke")}
            className="form-checkbox"
          ></input>
          <label htmlFor="stroke">Stroke</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="depression"
            name="depression"
            value="depression"
            onChange={() => onCheckboxChange("diseaseHistory", "depression")}
            checked={formData.diseaseHistory.includes("depression")}
            className="form-checkbox"
          ></input>
          <label htmlFor="depression">Depression</label>
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
          onChange={(e) => onChange("smokingHistory", e.target.value)}
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
