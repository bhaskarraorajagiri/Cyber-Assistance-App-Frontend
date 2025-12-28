import { useState } from "react";
import { checkRiskScore } from "../../services/securityService";

type Props = {
  onResult: (data: any) => void;
};

export default function RiskQuestionnaire({ onResult }: Props) {
  // ALL DEFAULT TO "NO"
  const [answers, setAnswers] = useState({
    reusePasswords: false,
    enable2FA: false,
    installRandomApps: false,
    updateSoftware: false,
    publicWifiNoVPN: false,
    clickUnknownLinks: false,
    ignoreSecurityAlerts: false,
    noBackups: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    //  NORMALIZED PAYLOAD (true = risky for backend)
    const payload = {
      // Identity
      reusePasswords: answers.reusePasswords,     // yes = risky
      enable2FA: !answers.enable2FA,              // no = risky

      // Device
      installRandomApps: answers.installRandomApps, // yes = risky
      updateSoftware: !answers.updateSoftware,      // no = risky

      // Network
      publicWifiNoVPN: answers.publicWifiNoVPN,     // yes = risky
      clickUnknownLinks: answers.clickUnknownLinks, // yes = risky

      // Awareness
      ignoreSecurityAlerts: answers.ignoreSecurityAlerts, // yes = risky
      noBackups: answers.noBackups,                        // yes = risky
    };

    // Optional: keep during testing
    console.log("FRONTEND RISK PAYLOAD:", payload);

    try {
      const data = await checkRiskScore(payload);
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
        onChange={(v) =>
          setAnswers({ ...answers, ignoreSecurityAlerts: v })
        }
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
        disabled={loading}
      >
        {loading ? "Calculating..." : "Calculate Risk Score"}
      </button>
    </div>
  );
}

function Question({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="question">
      <span>{label}</span>
      <div className="toggle">
        <button
          className={!value ? "active" : ""}
          onClick={() => onChange(false)}
        >
          No
        </button>
        <button
          className={value ? "active" : ""}
          onClick={() => onChange(true)}
        >
          Yes
        </button>
      </div>
    </div>
  );
}
