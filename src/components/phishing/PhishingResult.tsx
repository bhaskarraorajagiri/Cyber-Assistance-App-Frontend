type Indicator = {
  category: "URL Structure" | "Domain" | "Content" | "Network";
  name: string;
  severity: "low" | "medium" | "high";
  description: string;
};

type Props = {
  data: {
    riskScore: number;
    riskLevel: "Low" | "Medium" | "High";
    verdict: "clean" | "suspicious" | "malicious";
    confidence: number;
    indicators: Indicator[];
    suggestions: string[];
    extractedDomain?: string;
    estimatedDomainAge?: "Very New" | "New" | "Established";
  };
};

export default function PhishingResult({ data }: Props) {
  const verdictColor =
    data.verdict === "malicious"
      ? "var(--danger)"
      : data.verdict === "suspicious"
      ? "var(--warning)"
      : "var(--accent)";

  return (
    <div className="phishing-result">
      <h3>
        Verdict:{" "}
        <span style={{ color: verdictColor }}>
          {data.verdict.toUpperCase()}
        </span>{" "}
        ({data.riskScore}/100)
      </h3>

      <p>
        <strong>Confidence:</strong> {data.confidence}%
      </p>

      {data.extractedDomain && (
        <p>
          <strong>Domain:</strong> {data.extractedDomain}
        </p>
      )}

      {data.estimatedDomainAge && (
        <p>
          <strong>Estimated Domain Age:</strong>{" "}
          {data.estimatedDomainAge}
        </p>
      )}

      {data.indicators.length > 0 && (
        <>
          <h4>Detected Indicators</h4>
          <ul>
            {data.indicators.map((ind, i) => (
              <li key={i}>
                <strong>[{ind.category}]</strong> {ind.name}
                <br />
                <small>{ind.description}</small>
              </li>
            ))}
          </ul>
        </>
      )}

      {data.suggestions.length > 0 && (
        <>
          <h4>Safety Suggestions</h4>
          <ul>
            {data.suggestions.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
