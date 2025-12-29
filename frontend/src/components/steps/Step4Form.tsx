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
      {/* Conditionally render the selected image if it exists */}
      {formData.mriScan && (
        <div>
          {/* Display the selected image */}
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(formData.mriScan)}
          />
          <br /> <br />
          {/* Button to remove the selected image */}
          <button onClick={() => onChange("mriScan", null)}>Remove</button>
        </div>
      )}

      <br />

      {/* Input element to select an image file */}
      <input
        type="file"
        name="myImage"
        // Event handler to capture file selection and update the state
        onChange={(event) => {
          console.log(event.target.files[0]); // Log the selected file
          onChange("mriScan", event.target.files[0]); // Update the state with the selected file
        }}
      />
    </div>
  );
};

export default Step4Form;
