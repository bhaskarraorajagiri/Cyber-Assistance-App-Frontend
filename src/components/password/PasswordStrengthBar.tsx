type Props = {
  score: number; // 0–100
};

export default function PasswordStrengthBar({ score }: Props) {
  let color = "var(--danger)";
  let label = "Weak";

  if (score >= 75) {
    color = "var(--accent)";
    label = "Strong";
  } else if (score >= 40) {
    color = "var(--warning)";
    label = "Medium";
  }

  return (
    <div className="strength-bar">
      <div className="strength-header">
        <span>Password Strength</span>
        <span className="strength-label">{label}</span>
      </div>

      <div className="bar-bg">
        <div
          className="bar-fill"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
