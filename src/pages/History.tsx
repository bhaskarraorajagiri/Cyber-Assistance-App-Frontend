import { useEffect, useState } from "react";
import HistoryItem from "../components/history/HistoryItem";
import { fetchHistory } from "../services/securityService";
import "../styles/history.css";

type HistoryEntry = {
  _id: string;
  type: "PASSWORD" | "PHISHING" | "RISK_SCORE";
  level: "Low" | "Medium" | "High";
  score?: number;
  summary: string;
  createdAt: string;
};

export default function History() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch (err: any) {
        setError(err.message || "Failed to load history");
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, []);

  return (
    <div className="history-page">
      <h1>Activity History</h1>
      <p className="subtitle">
        Recent security checks (no sensitive data is stored).
      </p>

      {loading && <p className="subtitle">Loading history...</p>}

      {error && (
        <div className="rate-limit">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && history.length === 0 && (
        <p className="subtitle">
          No activity yet. Run a security check to see history here.
        </p>
      )}

      {!loading && !error && history.length > 0 && (
        <div className="history-list">
          {history.map((item) => (
            <HistoryItem
              key={item._id}
              data={{
                type: formatType(item.type),
                summary: item.summary,
                level: item.level,
                time: formatDate(item.createdAt),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function formatType(type: string) {
  switch (type) {
    case "PASSWORD":
      return "Password Check";
    case "PHISHING":
      return "Phishing Scan";
    case "RISK_SCORE":
      return "Cyber Risk Score";
    default:
      return type;
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleString();
}
