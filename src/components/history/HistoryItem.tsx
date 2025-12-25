type Props = {
  data: {
    type: string;
    summary: string;
    level: "Low" | "Medium" | "High";
    time: string;
  };
};

export default function HistoryItem({ data }: Props) {
  let color = "var(--accent)";
  if (data.level === "Medium") color = "var(--warning)";
  if (data.level === "High") color = "var(--danger)";

  return (
    <div className="history-item">
      <div className="history-left">
        <h3>{data.type}</h3>
        <p>{data.summary}</p>
      </div>

      <div className="history-right">
        <span className="level" style={{ color }}>
          {data.level}
        </span>
        <span className="time">{data.time}</span>
      </div>
    </div>
  );
}
