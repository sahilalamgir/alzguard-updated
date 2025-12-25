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
        {[
          {
            name: "Cardiovascular disease",
            value: "cardiovascular",
          },
          {
            name: "Diabetes",
            value: "diabetes",
          },
          {
            name: "Stroke",
            value: "stroke",
          },
          {
            name: "Depression",
            value: "depression",
          },
        ].map(disease => {
          <div key={disease.value}>
            hi
          </div>
        })}
        <div>
          <input
            type="checkbox"
            name="medicalHistory"
            id="medicalHistory"
            value={formData.medicalHistory}
            onChange={(e) => onChange("medicalHistory", e.target.value)}
            checked={formData.medicalHistory.includes("depression")}
            // className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
          ></input>
          <label htmlFor="medicalHistory">Depression</label>
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
