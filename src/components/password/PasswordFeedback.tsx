type Props = {
  data: {
    pwnedCount: number;
    issues: string[];
    suggestions: string[];
  };
};

export default function PasswordFeedback({ data }: Props) {
  return (
    <div className="feedback">
      <h3>Breach Status</h3>
      {data.pwnedCount > 0 ? (
        <p className="danger">
          ⚠ Found in {data.pwnedCount} known data breaches
        </p>
      ) : (
        <p className="safe">✅ Not found in known breaches</p>
      )}

      <h3>Issues</h3>
      <ul>
        {data.issues.map((issue, i) => (
          <li key={i}>{issue}</li>
        ))}
      </ul>

      <h3>Suggestions</h3>
      <ul>
        {data.suggestions.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
