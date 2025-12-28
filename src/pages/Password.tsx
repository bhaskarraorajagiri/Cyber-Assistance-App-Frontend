import { useState } from "react";
import PasswordStrengthBar from "../components/password/PasswordStrengthBar";
import PasswordFeedback from "../components/password/PasswordFeedback";
import { checkPassword } from "../services/securityService";
import "../styles/password.css";

export default function Password() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!password) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await checkPassword(password);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Unable to analyze password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-page">
      <h1>Password Safety</h1>
      <p className="subtitle">
        Analyze password strength and check if it has appeared in known data breaches.
      </p>

      <div className="password-box">
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="toggle-visibility"
            onClick={() => setShowPassword((prev) => !prev)}
            role="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Password"}
        </button>
      </div>

      {error && (
        <div className="rate-limit">
          ⚠️ {error}
        </div>
      )}

      {result && result.evaluation && (
        <>
          <PasswordStrengthBar
            score={result.evaluation.score}
            strength={result.evaluation.strength}
          />

          <PasswordFeedback
            data={{
              pwnedCount: result.pwnedCount ?? 0,
              issues: result.evaluation.issues ?? [],
              suggestions: result.evaluation.suggestions ?? [],
            }}
          />
        </>
      )}

      {result && !result.evaluation && (
        <div className="rate-limit">
          ⚠️ Unable to evaluate password. Please try again.
        </div>
      )}


      <p className="privacy-note">
        🔒 Passwords are analyzed securely and never stored.
      </p>
    </div>
  );
}
