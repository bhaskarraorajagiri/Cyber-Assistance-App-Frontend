type Props = {
  data: {
    riskScore: number;
    riskLevel: "Low" | "Medium" | "High";
    issues: string[];
    suggestions: string[];
  };
  onReset: () => void;
};

export default function RiskResult({ data, onReset }: Props) {
  let color = "var(--accent)";
  if (data.riskLevel === "Medium") color = "var(--warning)";
  if (data.riskLevel === "High") color = "var(--danger)";

  return (
    <div className="risk-result">
      <h2>
        Risk Score:{" "}
        <span style={{ color }}>{data.riskScore}</span>/100
      </h2>

      <p className="risk-level">
        Risk Level:{" "}
        <strong style={{ color }}>{data.riskLevel}</strong>
      </p>

      <h3>Identified Issues</h3>
      <ul>
        {data.issues.map((issue, i) => (
          <li key={i}>{issue}</li>
        ))}
      </ul>

      <h3>Recommended Actions</h3>
      <ul>
        {data.suggestions.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>

      <button className="secondary-btn" onClick={onReset}>
        Recalculate
      </button>
    </div>
  );
}
