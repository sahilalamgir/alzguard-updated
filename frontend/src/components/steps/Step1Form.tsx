import { AssessmentFormData } from "../../types/form";

interface Props {
  formData: AssessmentFormData;
  onChange: <K extends keyof AssessmentFormData>(
    field: K,
    value: AssessmentFormData[K]
  ) => void;
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
          value={formData.age ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              onChange("age", null);
            } else {
              const numValue = parseInt(value, 10);
              if (!isNaN(numValue) && numValue >= 0 && numValue <= 120) {
                onChange("age", numValue);
              }
            }
          }}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="sex" className="form-label">
          What is your sex?:
        </label>
        <select
          name="sex"
          id="sex"
          value={formData.sex}
          onChange={(e) =>
            onChange(
              "sex",
              e.target.value as AssessmentFormData["sex"]
            )
          }
          className="form-input"
        >
          <option value="">Select an option</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unspecified">Prefer not to say</option>
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
          onChange={(e) =>
            onChange(
              "educationLevel",
              e.target.value as AssessmentFormData["educationLevel"]
            )
          }
          className="form-input"
        >
          <option value="">Select an option</option>
          <option value="lessThanHighSchool">Less than high school</option>
          <option value="highSchool">High school</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduate">Graduate or higher</option>
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
          onChange={(e) =>
            onChange(
              "primaryLanguage",
              e.target.value as AssessmentFormData["primaryLanguage"]
            )
          }
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
