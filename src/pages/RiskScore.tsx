import { useState } from "react";
import RiskQuestionnaire from "../components/risk/RiskQuestionnaire";
import RiskResult from "../components/risk/RiskResult";
import "../styles/risk.css";

export default function RiskScore() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="risk-page">
      <h1>Cyber Risk Score</h1>
      <p className="subtitle">
        Answer a few questions to assess your personal cyber security hygiene.
      </p>

      {!result && <RiskQuestionnaire onResult={setResult} />}

      {result && <RiskResult data={result} onReset={() => setResult(null)} />}
    </div>
  );
}
