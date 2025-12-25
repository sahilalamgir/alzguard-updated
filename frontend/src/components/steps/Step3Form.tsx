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
        <label htmlFor="familyHistory" className="form-label">
          Does your family have history of Alzheimer's or dementia?:
        </label>
        <input
          type="text" // dropdown
          value={formData.familyHistory}
          onChange={(e) => onChange("familyHistory", e.target.value)} // can't go below 0
          className="form-input"
        ></input>
      </div>

      <div>
        <label htmlFor="familyHistory" className="form-label">
          What is your sex?:
        </label>
        <input
          type="text"
          value={formData.sex}
          onChange={(e) => onChange("sex", e.target.value)}
          className="form-input"
        ></input>
      </div>

      <div>
        <label htmlFor="familyHistory" className="form-label">
          What is your education level?:
        </label>
        <input // dropdown
          type="text"
          value={formData.educationLevel}
          onChange={(e) => onChange("educationLevel", e.target.value)}
          className="form-input"
        ></input>
      </div>

      <div>
        <label htmlFor="familyHistory" className="form-label">
          What is your primary language?:
        </label>
        <input // dropdown
          type="text"
          value={formData.primaryLanguage}
          onChange={(e) => onChange("primaryLanguage", e.target.value)}
          className="form-input"
        ></input>
      </div>
    </div>
  );
};

export default Step3Form;
