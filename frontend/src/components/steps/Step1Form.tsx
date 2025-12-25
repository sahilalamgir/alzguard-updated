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
        <label
          htmlFor="age"
          className="text-text-primary text-base block font-normal mb-2"
        >
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
          } // can't go below 0
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
        ></input>
      </div>

      <div>
        <label
          htmlFor="sex"
          className="text-text-primary text-base block font-normal mb-2"
        >
          What is your sex?:
        </label>
        <select
          name="sex"
          id="sex"
          value={formData.sex}
          onChange={(e) => onChange("sex", e.target.value)}
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
        >
          <option value="">Select an option</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unknown">Prefer not to say</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="educationLevel"
          className="text-text-primary text-base block font-normal mb-2"
        >
          What is your education level?:
        </label>
        <select // dropdown
          name="educationLevel"
          id="educationLevel"
          value={formData.educationLevel}
          onChange={(e) => onChange("educationLevel", e.target.value)}
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
        >
          <option value="">Select an option</option>
          <option value="none">None</option>
          <option value="highschool">Highschool</option>
          <option value="university">University</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="primaryLanguage"
          className="text-text-primary text-base block font-normal mb-2"
        >
          What is your primary language?:
        </label>
        <select // dropdown
          name="primaryLanguage"
          id="primaryLanguage"
          value={formData.primaryLanguage}
          onChange={(e) => onChange("primaryLanguage", e.target.value)}
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
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
