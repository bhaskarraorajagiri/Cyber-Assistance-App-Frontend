type Props = {
  data: {
    riskScore: number;
    riskLevel: "Low" | "Medium" | "High";
    reasons: string[];
    suggestions: string[];
    normalizedUrl?: string;
    extractedDomain?: string;
  };
};

export default function PhishingResult({ data }: Props) {
  let color = "var(--accent)";
  if (data.riskLevel === "Medium") color = "var(--warning)";
  if (data.riskLevel === "High") color = "var(--danger)";

  return (
    <div className="phishing-result">
      <h3>
        Risk Level:{" "}
        <span style={{ color }}>{data.riskLevel}</span>{" "}
        ({data.riskScore}/100)
      </h3>

      {data.extractedDomain && (
        <p>
          <strong>Domain:</strong> {data.extractedDomain}
        </p>
      )}

      <h4>Why this is risky</h4>
      <ul>
        {data.reasons.map((reason, i) => (
          <li key={i}>{reason}</li>
        ))}
      </ul>

      <h4>Safety Suggestions</h4>
      <ul>
        {data.suggestions.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
