import { useState } from "react";
import PhishingResult from "../components/phishing/PhishingResult";
import { checkPhishing } from "../services/securityService";
import ThreatExplanation from "../components/phishing/ThreatExplanation";
import "../styles/phishing.css";

type Mode = "url" | "message";

export default function Phishing() {
  const [mode, setMode] = useState<Mode>("url");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!input) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await checkPhishing(mode, input);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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

      {error && (
        <div className="rate-limit">
          ⚠️ {error}
        </div>
      )}


      {result && (
        <>
          <PhishingResult data={result} />
          <ThreatExplanation explanations={result.explanations} />
        </>
      )}

      <p className="privacy-note">
        🔒 Content is analyzed securely and never stored.
      </p>
    </div>
  );
}
