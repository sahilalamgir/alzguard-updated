interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const Step1Form = ({ formData, onChange }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-text-primary font-semibold mb-6">
        Step 1: About You
      </h2>
      <div>
        <label htmlFor="age" className="form-label">
          What is your age?:
        </label>
        <input
          type="number"
          name="age"
          id="age"
          autoComplete="off"
          placeholder="Enter your age..."
          value={formData.age}
          onChange={(e) =>
            onChange("age", Number(e.target.value) < 0 ? 0 : e.target.value)
          }
          className="form-input"
        ></input>
      </div>

      <div>
        <label htmlFor="sex" className="form-label">
          What is your sex?:
        </label>
        <select
          name="sex"
          id="sex"
          value={formData.sex}
          onChange={(e) => onChange("sex", e.target.value)}
          className="form-input"
        >
          <option value="">Select an option</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unknown">Prefer not to say</option>
        </select>
      </div>

      <div>
        <label htmlFor="educationLevel" className="form-label">
          What is your education level?:
        </label>
        <select
          name="educationLevel"
          id="educationLevel"
          value={formData.educationLevel}
          onChange={(e) => onChange("educationLevel", e.target.value)}
          className="form-input"
        >
          <option value="">Select an option</option>
          <option value="none">None</option>
          <option value="highschool">Highschool</option>
          <option value="university">University</option>
        </select>
      </div>

      <div>
        <label htmlFor="primaryLanguage" className="form-label">
          What is your primary language?:
        </label>
        <select
          name="primaryLanguage"
          id="primaryLanguage"
          value={formData.primaryLanguage}
          onChange={(e) => onChange("primaryLanguage", e.target.value)}
          className="form-input"
        >
          <option value="">Select an option</option>
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
        </select>
      </div>
    </div>
  );
};

export default Step1Form;
