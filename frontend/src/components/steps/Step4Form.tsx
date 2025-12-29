interface Props {
  formData: any;
  onChange: (field: string, value: any) => void;
}

const Step4Form = ({ formData, onChange }: Props) => {
  return (
    <div>
      <h2 className="text-2xl text-text-primary font-semibold mb-6">
        Step 4: Upload MRI Scan
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
    </div>
  );
};

export default Step4Form;
