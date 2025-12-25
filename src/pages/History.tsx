import HistoryItem from "../components/history/HistoryItem";
import "../styles/history.css";

type HistoryLevel = "Low" | "Medium" | "High";
type HistoryEntry = {
  id: string;
  type: string;
  summary: string;
  level: HistoryLevel;
  time: string;
};

export default function History() {
  // TEMP mock data (replace with backend later)
  const history: HistoryEntry[] = [
    {
      id: "1",
      type: "Password Check",
      summary: "Password found in 53 breaches",
      level: "High",
      time: "2025-01-25 14:32",
    },
    {
      id: "2",
      type: "Phishing Scan",
      summary: "Suspicious URL with urgency keywords",
      level: "High",
      time: "2025-01-25 13:10",
    },
    {
      id: "3",
      type: "Cyber Risk Score",
      summary: "Overall risk score: 58/100",
      level: "Medium",
      time: "2025-01-24 21:45",
    },
  ];

  return (
    <div className="history-page">
      <h1>Activity History</h1>
      <p className="subtitle">
        Your recent security checks (no sensitive data is stored).
      </p>

      <div className="history-list">
        {history.map((item) => (
          <HistoryItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}