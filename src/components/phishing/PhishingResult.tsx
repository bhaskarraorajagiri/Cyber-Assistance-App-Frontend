type Props = {
  data: {
    risk: "Low" | "Medium" | "High";
    reasons: string[];
    recommendation: string;
  };
};

export default function PhishingResult({ data }: Props) {
  let color = "var(--accent)";
  if (data.risk === "Medium") color = "var(--warning)";
  if (data.risk === "High") color = "var(--danger)";

  return (
    <div className="phishing-result">
      <h3>
        Risk Level:{" "}
        <span style={{ color }}>{data.risk}</span>
      </h3>

      <h4>Why this is risky</h4>
      <ul>
        {data.reasons.map((reason, i) => (
          <li key={i}>{reason}</li>
        ))}
      </ul>

      <p className="recommendation">
        👉 {data.recommendation}
      </p>
    </div>
  );
}
