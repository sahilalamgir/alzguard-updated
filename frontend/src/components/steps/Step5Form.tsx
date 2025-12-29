import { capitalizeFirstLetter } from "../../utils/string";

interface Props {
  formData: any;
}

const Step5Form = ({ formData }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-text-primary font-semibold mb-6">
        Step 5: Review &amp; Submit
      </h2>
      <div>
        <h2 className="text-xl text-text-primary font-semibold mb-3">
          About You
        </h2>
        <p className="form-label">Age: {capitalizeFirstLetter(formData.age)}</p>
        <p className="form-label">Sex: {capitalizeFirstLetter(formData.sex)}</p>
        <p className="form-label">
          Education level: {capitalizeFirstLetter(formData.educationLevel)}
        </p>
        <p className="form-label">
          Primary language: {capitalizeFirstLetter(formData.primaryLanguage)}
        </p>
      </div>
      <div>
        <h2 className="text-xl text-text-primary font-semibold mb-3">
          Health Background
        </h2>
        <p className="form-label">
          Family history: {capitalizeFirstLetter(formData.familyHistory)}
        </p>
        <div className="form-label flex space-x-1">
          <span>Cardiovascular condition history: </span>
          {formData.conditionHistory.length === 0 ? (
            "None"
          ) : (
            <ul className="flex space-x-1 list-none p-0">
              {formData.conditionHistory.map((condition: string) => (
                <li
                  key={condition}
                  className="after:content-[','] last:after:content-['']"
                >
                  {capitalizeFirstLetter(condition)}
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="form-label">
          Smoking history: {capitalizeFirstLetter(formData.smokingHistory)}
        </p>
      </div>
      <div>
        <h2 className="text-xl text-text-primary font-semibold mb-3">
          Cognitive Experience
        </h2>
        <p className="form-label">
          Memory issues: {capitalizeFirstLetter(formData.memoryIssues)}
        </p>
        <p className="form-label">
          Conversational issues:{" "}
          {capitalizeFirstLetter(formData.conversationalIssues)}
        </p>
        <p className="form-label">
          Misplacement issues:{" "}
          {capitalizeFirstLetter(formData.misplacementIssues)}
        </p>
      </div>
    </div>
  );
};

export default Step5Form;
