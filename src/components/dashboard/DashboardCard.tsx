type Props = {
  title: string;
  level?: "Low" | "Medium" | "High";
  score?: number;
  summary?: string;
};

export default function DashboardCard({
  title,
  level,
  score,
  summary,
}: Props) {
  let color = "var(--accent)";
  if (level === "Medium") color = "var(--warning)";
  if (level === "High") color = "var(--danger)";

  return (
    <div className="dashboard-card">
      <h3>{title}</h3>

      {level && (
        <p>
          Risk Level: <strong style={{ color }}>{level}</strong>
        </p>
      )}

      {typeof score === "number" && (
        <p>
          Score: <strong>{score}/100</strong>
        </p>
      )}

      {summary && <p className="summary">{summary}</p>}
    </div>
  );
}
