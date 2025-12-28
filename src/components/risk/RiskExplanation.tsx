type Props = {
  explanations: {
    title: string;
    whyItMatters: string;
    nextSteps: string[];
    severity: "low" | "medium" | "high";
  }[];
};

export default function RiskExplanation({ explanations }: Props) {
  if (!explanations || explanations.length === 0) return null;

  return (
    <div className="threat-explanation">
      <h3>Why your cyber risk is high</h3>

      {explanations.map((ex, i) => (
        <div key={i} className={`explanation ${ex.severity}`}>
          <h4>{ex.title}</h4>
          <p>{ex.whyItMatters}</p>
          <strong>What you should do:</strong>
          <ul>
            {ex.nextSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
