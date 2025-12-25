interface Props {
  formData: any;
}

const Step4Form = ({ formData }: Props) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-text-primary font-semibold mb-6">
        Step 4: Review &amp; Submit
      </h2>
      <div>
        <h2 className="text-xl text-text-primary font-semibold mb-6">
          About You
        </h2>
        <p className="form-label">Age: {formData.age}</p>
        <p className="form-label">Sex: {formData.sex}</p>
        <p className="form-label">Education level: {formData.educationLevel}</p>
        <p className="form-label">
          Primary language: {formData.primaryLanguage}
        </p>
      </div>
      <div>
        <h2 className="text-xl text-text-primary font-semibold mb-6">
          Health Background
        </h2>
        <p className="form-label">Family history: {formData.familyHistory}</p>
        <p className="form-label">
          Disease history:{" "}
          {formData.diseaseHistory.length === 0
            ? "None"
            : formData.diseaseHistory.map((disease: string) => (
                <li key={disease}>{disease}</li>
              ))}
        </p>
        <p className="form-label">Smoking history: {formData.smokingHistory}</p>
      </div>
      <div>
        <h2 className="text-xl text-text-primary font-semibold mb-6">
          Cognitive Experience
        </h2>
        <p className="form-label">Memory issues: {formData.memoryIssues}</p>
        <p className="form-label">
          Conversational issues: {formData.conversationalIssues}
        </p>
        <p className="form-label">
          Misplacement issues: {formData.misplacementIssues}
        </p>
      </div>
    </div>
  );
};

export default Step4Form;
