import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";

import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="home">
        <section className="hero">
          <h1>Cyber Assistance Tool</h1>
          <p>
            Analyze passwords, detect phishing attempts, and assess your cyber
            risk — instantly and securely.
          </p>
        </section>

        <section className="features">
          <FeatureCard
            title="Password Safety"
            description="Check password strength and data-breach exposure."
            icon="🔐"
            onClick={() => navigate("/password")}
          />

          <FeatureCard
            title="Phishing Detection"
            description="Analyze suspicious links and messages."
            icon="🚨"
            onClick={() => navigate("/phishing")}
          />

          <FeatureCard
            title="Cyber Risk Score"
            description="Measure your personal security hygiene."
            icon="📊"
            onClick={() => navigate("/risk-score")}
          />

          <FeatureCard
            title="AI Security Assistant"
            description="Ask security questions and get guidance."
            icon="🤖"
            onClick={() => navigate("/ai")}
          />
        </section>

        <footer className="footer">
          <p>© 2025 CyberAssist · Privacy-first · No data stored</p>
        </footer>
      </main>
    </>
  );
}