type Props = {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
};

export default function FeatureCard({ title, description, icon, onClick }: Props) {
  return (
    <div
        className="feature-card"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}>
    <div className="feature-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    <span className="cta">Try now →</span>
    </div>
  );
}
