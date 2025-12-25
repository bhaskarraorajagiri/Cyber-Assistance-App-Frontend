type Props = {
  data: {
    score: number;
    level: "Low" | "Medium" | "High";
    issues: string[];
    recommendations: string[];
  };
  onReset: () => void;
};

export default function RiskResult({ data, onReset }: Props) {
  let color = "var(--accent)";
  if (data.level === "Medium") color = "var(--warning)";
  if (data.level === "High") color = "var(--danger)";

  return (
    <div className="risk-result">
      <h2>
        Your Risk Score:{" "}
        <span style={{ color }}>{data.score}</span>/100
      </h2>
      <p className="risk-level">
        Risk Level: <strong style={{ color }}>{data.level}</strong>
      </p>

      <h3>Identified Issues</h3>
      <ul>
        {data.issues.map((issue, i) => (
          <li key={i}>{issue}</li>
        ))}
      </ul>

      <h3>Recommendations</h3>
      <ul>
        {data.recommendations.map((rec, i) => (
          <li key={i}>{rec}</li>
        ))}
      </ul>

      <button className="secondary-btn" onClick={onReset}>
        Recalculate
      </button>
    </div>
  );
}
