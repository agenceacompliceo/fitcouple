import { useState, useEffect } from "react";
import { ProfileProvider, useProfile } from "./context/ProfileContext";
import ProfileSelect from "./components/ProfileSelect";
import Dashboard from "./components/Dashboard";
import Exercises from "./components/Exercises";
import BodyTracking from "./components/BodyTracking";
import Alarms from "./components/Alarms";
import Budget from "./components/Budget";
import BottomNav from "./components/BottomNav";
import { IconX, IconSettings, IconCloudCheck, IconCloudOff } from "@tabler/icons-react";
import { syncStatus, checkConnection, profilesDb } from "./lib/db";
import "./App.css";

function SettingsSheet({ onClose }) {
  const { profile, logout, sportTime, setSportTime } = useProfile();

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="settings-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-header">
          <span className="sheet-title">{profile === "adam" ? "Adam" : "Andréa"}</span>
          <button className="btn-ghost" onClick={onClose}>
            <IconX size={20} stroke={1.5} />
          </button>
        </div>

        <div className="settings-section">
          <label className="settings-label">Heure de sport</label>
          <div className="sport-time-toggle">
            <button
              className={`sport-time-btn ${sportTime === "morning" ? "active" : ""}`}
              onClick={() => setSportTime("morning")}
            >
              Matin (11h)
            </button>
            <button
              className={`sport-time-btn ${sportTime === "afternoon" ? "active" : ""}`}
              onClick={() => setSportTime("afternoon")}
            >
              Après-midi (15h)
            </button>
          </div>
          <p className="settings-hint">
            {sportTime === "morning"
              ? "Booster 10h30, séance 11h, repas post 12h30"
              : "Collation 14h15, booster 14h30, séance 15h, repas post 16h15"}
          </p>
        </div>

        <button
          className="btn-secondary settings-logout"
          onClick={() => { logout(); onClose(); }}
        >
          Changer de profil
        </button>
      </div>
    </div>
  );
}

function AppContent() {
  const { profile, loading, dbError } = useProfile();
  const [tab, setTab] = useState("dashboard");
  const [exerciseSession, setExerciseSession] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [sync, setSync] = useState(syncStatus.get());

  useEffect(() => {
    profilesDb.ensureExists();
    checkConnection();
    return syncStatus.subscribe(setSync);
  }, []);

  if (!profile) return <ProfileSelect />;

  if (loading) {
    return (
      <div className="app-shell loading-shell">
        <div className="loading-screen">
          <div className="loading-spinner" />
          <p className="loading-text">Chargement…</p>
        </div>
      </div>
    );
  }

  const navigateToExercises = (session) => {
    setExerciseSession(session);
    setTab("exercises");
  };

  const handleTabChange = (newTab) => {
    if (newTab !== "exercises") setExerciseSession(null);
    setTab(newTab);
  };

  const displayName = profile === "adam" ? "Adam" : "Andréa";

  return (
    <div className="app-shell">
      <header className="top-bar">
        <span className="top-bar-name">{displayName}</span>
        <div className="top-bar-right">
          <span
            className={`sync-indicator ${sync}`}
            title={sync === "online" ? "Synchronisé avec Supabase" : sync === "offline" ? "Hors ligne — données locales" : "Vérification…"}
          >
            {sync === "online"
              ? <IconCloudCheck size={18} stroke={1.5} />
              : <IconCloudOff size={18} stroke={1.5} />}
          </span>
          <button className="btn-ghost top-bar-settings" onClick={() => setShowSettings(true)}>
            <IconSettings size={20} stroke={1.5} />
          </button>
        </div>
      </header>

      {(sync === "offline" || dbError) && (
        <div className="sync-error-banner">
          {dbError ?? "Hors ligne — les données ne se synchronisent pas."}
        </div>
      )}

      <main className="main-content" key={tab}>
        {tab === "dashboard" && <Dashboard onNavigateToExercises={navigateToExercises} />}
        {tab === "exercises" && <Exercises defaultSession={exerciseSession} />}
        {tab === "body" && <BodyTracking />}
        {tab === "alarms" && <Alarms />}
        {tab === "budget" && <Budget />}
      </main>

      <BottomNav active={tab} onChange={handleTabChange} />

      {showSettings && <SettingsSheet onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <AppContent />
    </ProfileProvider>
  );
}
