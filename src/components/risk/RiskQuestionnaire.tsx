import { useState } from "react";
import { checkRiskScore } from "../../services/securityService";

type AnswerValue = boolean | null;

type Props = {
  onResult: (data: any) => void;
};

export default function RiskQuestionnaire({ onResult }: Props) {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({
    reusePasswords: null,
    enable2FA: null,
    installRandomApps: null,
    updateSoftware: null,
    publicWifiNoVPN: null,
    clickUnknownLinks: null,
    ignoreSecurityAlerts: null,
    noBackups: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔒 Ensure all questions are answered
  const allAnswered = Object.values(answers).every(
    (v) => typeof v === "boolean"
  );

  const handleSubmit = async () => {
    if (!allAnswered) {
      setError("Please answer all questions before calculating your risk score.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 🔑 Normalization: backend expects true = risky
      const normalizedPayload = {
        reusePasswords: answers.reusePasswords as boolean,
        enable2FA: !(answers.enable2FA as boolean),

        installRandomApps: answers.installRandomApps as boolean,
        updateSoftware: !(answers.updateSoftware as boolean),

        publicWifiNoVPN: answers.publicWifiNoVPN as boolean,
        clickUnknownLinks: answers.clickUnknownLinks as boolean,

        ignoreSecurityAlerts: answers.ignoreSecurityAlerts as boolean,
        noBackups: answers.noBackups as boolean,
      };

      const data = await checkRiskScore(normalizedPayload);
      onResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="questionnaire">
      <Question
        label="Do you reuse passwords across multiple accounts?"
        value={answers.reusePasswords}
        onChange={(v) => setAnswers({ ...answers, reusePasswords: v })}
      />

      <Question
        label="Do you enable Two-Factor Authentication (2FA)?"
        value={answers.enable2FA}
        onChange={(v) => setAnswers({ ...answers, enable2FA: v })}
      />

      <Question
        label="Do you install apps from unknown or untrusted sources?"
        value={answers.installRandomApps}
        onChange={(v) => setAnswers({ ...answers, installRandomApps: v })}
      />

      <Question
        label="Do you regularly update your OS and applications?"
        value={answers.updateSoftware}
        onChange={(v) => setAnswers({ ...answers, updateSoftware: v })}
      />

      <Question
        label="Do you use public Wi-Fi without a VPN?"
        value={answers.publicWifiNoVPN}
        onChange={(v) => setAnswers({ ...answers, publicWifiNoVPN: v })}
      />

      <Question
        label="Do you click on unknown or suspicious links?"
        value={answers.clickUnknownLinks}
        onChange={(v) => setAnswers({ ...answers, clickUnknownLinks: v })}
      />

      <Question
        label="Do you ignore security warnings or alerts?"
        value={answers.ignoreSecurityAlerts}
        onChange={(v) => setAnswers({ ...answers, ignoreSecurityAlerts: v })}
      />

      <Question
        label="Do you keep no backups of important data?"
        value={answers.noBackups}
        onChange={(v) => setAnswers({ ...answers, noBackups: v })}
      />

      {error && (
        <div className="rate-limit">
          ⚠️ <span>{error}</span>
        </div>
      )}

      <button
        className="analyze-btn"
        onClick={handleSubmit}
        disabled={loading || !allAnswered}
      >
        {loading ? "Calculating..." : "Calculate Risk Score"}
      </button>

      {!allAnswered && (
        <p className="privacy-note">
          ⚠️ Please answer all questions to get an accurate risk score.
        </p>
      )}
    </div>
  );
}

/* ---------- Question Component ---------- */

function Question({
  label,
  value,
  onChange,
}: {
  label: string;
  value: AnswerValue;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="question">
      <span>{label}</span>
      <div className="toggle">
        <button
          className={value === false ? "active" : ""}
          onClick={() => onChange(false)}
        >
          No
        </button>
        <button
          className={value === true ? "active" : ""}
          onClick={() => onChange(true)}
        >
          Yes
        </button>
      </div>
    </div>
  );
}
