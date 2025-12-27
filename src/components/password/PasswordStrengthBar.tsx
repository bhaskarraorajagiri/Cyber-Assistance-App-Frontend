type Props = {
  score: number;
  strength: "Weak" | "Medium" | "Strong";
};

export default function PasswordStrengthBar({ score, strength }: Props) {
  let color = "var(--danger)";

  if (strength === "Strong") color = "var(--accent)";
  else if (strength === "Medium") color = "var(--warning)";

  return (
    <div className="strength-bar">
      <div className="strength-header">
        <span>Password Strength</span>
        <span className="strength-label">{strength}</span>
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
