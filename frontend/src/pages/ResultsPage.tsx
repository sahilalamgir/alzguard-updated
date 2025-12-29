import { useLocation } from "react-router-dom";
import StageProbabilityChart from "../components/StageProbabilityChart";
import { capitalizeFirstLetter } from "../utils/string";

const ResultsPage = () => {
  const location = useLocation();
  const result = location.state;
  const data = result.labels.map((label: string, index: number) => {
    return { label, probability: result.probabilities[index] };
  });
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-text-primary text-3xl font-semibold">
          Your Assessment Summary
        </h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div className="space-y-4">
          <p className="text-2xl text-text-primary font-semibold">
            Most Likely Stage:{" "}
            <span className="text-text-secondary">
              {result.predicted_label}
            </span>
          </p>
          <p className="text-2xl text-text-primary font-semibold">
            Model Confidence:{" "}
            <span className="text-text-secondary">
              {Math.round(result.confidence * 100)}%
            </span>
          </p>
          <p className="text-text-secondary text-base leading-relaxed">
            Confidence reflects how strongly the model favored this stage
            compared to others.
          </p>
        </div>
        <div className="space-y-4 border-t py-4">
          <StageProbabilityChart data={data} />
          <p className="text-text-secondary text-base leading-relaxed">
            This chart shows the model&apos;s confidence across all disease
            stages.
          </p>
        </div>
        <div className="space-y-4 border-t py-4">
          <p className="text-2xl text-text-primary font-semibold">
            Overall Risk Level:{" "}
            <span className="text-text-secondary">
              {capitalizeFirstLetter(result.risk)}
            </span>
          </p>
          <p className="text-text-secondary text-base leading-relaxed">
            MRI patterns were consistent with early structural changes. Reported
            memory symptoms and age range increase estimated cognitive risk.
          </p>
        </div>
        <div className="space-y-4 border-t py-4">
          <p className="text-text-secondary text-base leading-relaxed">
            This tool is for informational purposes only and is not a medical
            diagnosis. Please consult a qualified healthcare professional for
            clinical evaluation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
