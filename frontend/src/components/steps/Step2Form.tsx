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
        <label
          htmlFor="familyHistory"
          className="text-text-primary text-base block font-normal mb-2"
        >
          Does your family have history of Alzheimer's or dementia?:
        </label>
        <select
          name="familyHistory"
          id="familyHistory"
          value={formData.familyHistory}
          onChange={(e) => onChange("familyHistory", e.target.value)} // can't go below 0
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
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
            className="mr-2 h-4 w-4 text-accent focus:ring-accent"
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
            className="mr-2 h-4 w-4 text-accent focus:ring-accent"
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
            className="mr-2 h-4 w-4 text-accent focus:ring-accent"
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
            className="mr-2 h-4 w-4 text-accent focus:ring-accent"
          ></input>
          <label htmlFor="depression">Depression</label>
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="familyHistory"
          className="text-text-primary text-base block font-normal mb-2"
        >
          What is your education level?:
        </label>
        <input // dropdown
          type="text"
          value={formData.educationLevel}
          onChange={(e) => onChange("educationLevel", e.target.value)}
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
        ></input>
      </div>

      <div>
        <label
          htmlFor="familyHistory"
          className="text-text-primary text-base block font-normal mb-2"
        >
          What is your primary language?:
        </label>
        <input // dropdown
          type="text"
          value={formData.primaryLanguage}
          onChange={(e) => onChange("primaryLanguage", e.target.value)}
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
        ></input>
      </div>
    </div>
  );
};

export default Step2Form;
