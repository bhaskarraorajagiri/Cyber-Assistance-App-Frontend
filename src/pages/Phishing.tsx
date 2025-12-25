import { useState } from "react";
import PhishingResult from "../components/phishing/PhishingResult";
import "../styles/phishing.css";

type Mode = "url" | "message";

export default function Phishing() {
  const [mode, setMode] = useState<Mode>("url");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!input) return;
    setLoading(true);

    // TEMP mock result (replace with API call)
    setTimeout(() => {
      setResult({
        risk: "High",
        reasons: [
          "Uses urgency language",
          "Suspicious domain structure",
          "Requests sensitive information",
        ],
        recommendation: "Do not click the link or respond to the message.",
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="phishing-page">
      <h1>Phishing Detection</h1>
      <p className="subtitle">
        Analyze suspicious links or messages to detect phishing attempts.
      </p>

      <div className="mode-toggle">
        <button
          className={mode === "url" ? "active" : ""}
          onClick={() => setMode("url")}
        >
          URL
        </button>
        <button
          className={mode === "message" ? "active" : ""}
          onClick={() => setMode("message")}
        >
          Message
        </button>
      </div>

      <textarea
        placeholder={
          mode === "url"
            ? "Paste the suspicious URL here"
            : "Paste the suspicious message or email content here"
        }
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        className="analyze-btn"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && <PhishingResult data={result} />}

      <p className="privacy-note">
        🔒 Content is analyzed in real-time and not stored.
      </p>
    </div>
  );
}
