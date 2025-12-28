type Props = {
  posture: "Secure" | "Moderate Risk" | "High Risk";
};

export default function OverallPosture({ posture }: Props) {
  let color = "var(--accent)";
  if (posture === "Moderate Risk") color = "var(--warning)";
  if (posture === "High Risk") color = "var(--danger)";

  return (
    <div className="overall-posture">
      <h2>
        Overall Security Status:{" "}
        <span style={{ color }}>{posture}</span>
      </h2>
    </div>
  );
}
