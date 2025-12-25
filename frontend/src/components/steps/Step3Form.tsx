interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const Step3Form = ({ formData, onChange }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-text-primary font-semibold mb-6">
        Step 3: Cognitive Experience
      </h2>
      <div>
        <label
          htmlFor="familyHistory"
          className="text-text-primary text-base block font-normal mb-2"
        >
          Does your family have history of Alzheimer's or dementia?:
        </label>
        <input
          type="text" // dropdown
          value={formData.familyHistory}
          onChange={(e) => onChange("familyHistory", e.target.value)} // can't go below 0
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
        ></input>
      </div>

      <div>
        <label
          htmlFor="familyHistory"
          className="text-text-primary text-base block font-normal mb-2"
        >
          What is your sex?:
        </label>
        <input
          type="text"
          value={formData.sex}
          onChange={(e) => onChange("sex", e.target.value)}
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
        ></input>
      </div>

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

export default Step3Form;
