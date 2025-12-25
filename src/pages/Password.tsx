import { useState } from "react";
import PasswordStrengthBar from "../components/password/PasswordStrengthBar";
import PasswordFeedback from "../components/password/PasswordFeedback";
import "../styles/password.css";

export default function Password() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!password) return;
    setLoading(true);

    // TEMP: mock result (replace with API call later)
    setTimeout(() => {
      setResult({
        score: 62,
        strength: "Medium",
        pwnedCount: 53,
        issues: [
          "Password is reused",
          "No special characters",
        ],
        suggestions: [
          "Add symbols like !@#$",
          "Use a password manager",
        ],
      });
      setLoading(false);
    }, 800);
  };

  return (
    <div className="password-page">
      <h1>Password Safety</h1>
      <p className="subtitle">
        Analyze password strength and check if it has appeared in data breaches.
      </p>

      <div className="password-box">
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Password"}
        </button>
      </div>

      {result && (
        <>
          <PasswordStrengthBar score={result.score} />
          <PasswordFeedback data={result} />
        </>
      )}

      <p className="privacy-note">
        🔒 Passwords are analyzed locally and never stored.
      </p>
    </div>
  );
}
