import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const StageProbabilityChart = ({ data }: any) => {
  return (
    <div className="text-center">
      <h3 className="mx-auto text-[#808080] text-xl">
        Predicted Probability by Disease Stage
      </h3>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <Bar
            dataKey="probability"
            fill="#8FABD4"
            activeBar={{ fill: "#7A98C0" }}
            radius={[10, 10, 0, 0]}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            type="category"
            label={{
              value: "Disease Stage",
              position: "insideBottom",
              offset: -10,
            }}
          />
          <YAxis
            width="auto"
            type="number"
            domain={[0, 1]}
            tickCount={11}
            tickFormatter={(value) => `${Math.round(value * 100)}%`}
            label={{
              value: "Model Confidence (%)",
              angle: -90,
              position: "insideLeft",
              offset: 10,
            }}
          />
          <Tooltip
            formatter={(value) => `${Math.round(Number(value) * 100)}%`}
            labelFormatter={(label) => `Stage: ${label}`}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StageProbabilityChart;
