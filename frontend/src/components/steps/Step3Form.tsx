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
        <label htmlFor="memoryIssues" className="form-label">
          Have you noticed increased memory lapses in the past 12 months?:
        </label>
        <select
          name="memoryIssues"
          id="memoryIssues"
          value={formData.memoryIssues}
          onChange={(e) => onChange("memoryIssues", e.target.value)}
          className="form-input"
        >
          <option value="">Select an option</option>
          <option value="never">Never</option>
          <option value="sometimes">Sometimes</option>
          <option value="often">Often</option>
          <option value="veryOften">Very often</option>
        </select>
      </div>

      <div>
        <label htmlFor="conversationalIssues" className="form-label">
          Do you find it harder to follow conversations than before?:
        </label>
        <select
          name="conversationalIssues"
          id="conversationalIssues"
          value={formData.conversationalIssues}
          onChange={(e) => onChange("conversationalIssues", e.target.value)}
          className="form-input"
        >
          <option value="">Select an option</option>
          <option value="never">Never</option>
          <option value="sometimes">Sometimes</option>
          <option value="often">Often</option>
          <option value="veryOften">Very often</option>
        </select>
      </div>

      <div>
        <label htmlFor="misplacementIssues" className="form-label">
          Do you misplace items more frequently?:
        </label>
        <select
          name="misplacementIssues"
          id="misplacementIssues"
          value={formData.misplacementIssues}
          onChange={(e) => onChange("misplacementIssues", e.target.value)}
          className="form-input"
        >
          <option value="">Select an option</option>
          <option value="never">Never</option>
          <option value="sometimes">Sometimes</option>
          <option value="often">Often</option>
          <option value="veryOften">Very often</option>
        </select>
      </div>
    </div>
  );
};

export default Step3Form;
