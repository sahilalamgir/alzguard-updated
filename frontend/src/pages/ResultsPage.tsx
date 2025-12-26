import { useLocation } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const result = location.state;
  return <div>hiii {result.final_score}</div>;
};

export default ResultsPage;
