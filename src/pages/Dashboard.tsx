import { useEffect, useState } from "react";
import { fetchDashboard } from "../services/dashboardService";
import DashboardCard from "../components/dashboard/DashboardCard";
import OverallPosture from "../components/dashboard/OverallPosture";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("cyberAssistUserId");

    if (!userId) {
      setError("User identity not found.");
      return;
    }

    fetchDashboard(userId)
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="rate-limit">⚠️ {error}</div>;
  }

  if (!data) {
    return <p className="loading">Loading dashboard...</p>;
  }

  return (
    <div className="dashboard-page">
      <h1>Security Dashboard</h1>

      <OverallPosture posture={data.overallPosture} />

      <div className="dashboard-grid">
        <DashboardCard
          title="Phishing Check"
          level={data.phishing?.level}
          score={data.phishing?.score}
          summary={data.phishing?.summary}
        />

        <DashboardCard
          title="Password Hygiene"
          level={data.password?.level}
          score={data.password?.score}
          summary={data.password?.summary}
        />

        <DashboardCard
          title="Cyber Risk Score"
          level={data.riskScore?.level}
          score={data.riskScore?.score}
          summary={data.riskScore?.summary}
        />
      </div>

      <p className="privacy-note">
        🔒 Dashboard is linked to your browser only. No personal data stored.
      </p>
    </div>
  );
}
