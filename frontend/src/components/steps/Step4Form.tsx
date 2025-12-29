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
      {formData.mriScan && (
        <div>
          <img
            alt="Image not found"
            src={URL.createObjectURL(formData.mriScan)}
            className="w-full"
          />
          <button
            onClick={() => onChange("mriScan", null)}
            className="btn-primary"
          >
            Remove
          </button>
        </div>
      )}
      <input
        type="file"
        name="myImage"
        onChange={(e) => {
          onChange("mriScan", e.target.files[0]);
        }}
      />
    </div>
  );
};

export default Step4Form;
