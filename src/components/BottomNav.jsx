import { useProfile } from "../context/ProfileContext";

const TABS = [
  { id: "dashboard", label: "Accueil", icon: "🏠" },
  { id: "exercises", label: "Exercices", icon: "💪" },
  { id: "bmi", label: "IMC", icon: "📊" },
  { id: "alarms", label: "Alarmes", icon: "🔔" },
];

export default function BottomNav({ active, onChange }) {
  const { profile, logout } = useProfile();

  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
      <button className="nav-item" onClick={logout} title="Changer de profil">
        <span className="nav-icon">👤</span>
        <span className="nav-label">{profile === "adam" ? "Adam" : "Andréa"}</span>
      </button>
    </nav>
  );
}
