import { useState } from "react";

type Props = {
  onResult: (data: any) => void;
};

export default function RiskQuestionnaire({ onResult }: Props) {
  const [answers, setAnswers] = useState({
    reusePasswords: false,
    enable2FA: true,
    installRandomApps: false,
    updateSoftware: true,
  });

  const handleSubmit = () => {
    // TEMP mock result (replace with API later)
    onResult({
      score: 58,
      level: "Medium",
      issues: [
        "You reuse passwords across accounts",
        "2FA is not enabled everywhere",
      ],
      recommendations: [
        "Use a password manager",
        "Enable 2FA on all important accounts",
      ],
    });
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
        label="Do you regularly update your operating system and apps?"
        value={answers.updateSoftware}
        onChange={(v) => setAnswers({ ...answers, updateSoftware: v })}
      />

      <button className="analyze-btn" onClick={handleSubmit}>
        Calculate Risk Score
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
