import { useProfile } from "../context/ProfileContext";
import {
  IconLayoutDashboard, IconBarbell, IconRuler2,
  IconBell, IconWallet, IconStopwatch,
} from "@tabler/icons-react";

const TABS = [
  { id: "dashboard", label: "Accueil", Icon: IconLayoutDashboard },
  { id: "exercises", label: "Sport", Icon: IconBarbell },
  { id: "timer", label: "Chrono", Icon: IconStopwatch },
  { id: "body", label: "Suivi", Icon: IconRuler2 },
  { id: "budget", label: "Budget", Icon: IconWallet },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`nav-item ${active === id ? "active" : ""}`}
          onClick={() => onChange(id)}
        >
          <Icon size={22} stroke={active === id ? 2 : 1.5} />
          <span className="nav-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
