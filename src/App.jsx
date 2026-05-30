import { useState } from "react";
import { ProfileProvider, useProfile } from "./context/ProfileContext";
import ProfileSelect from "./components/ProfileSelect";
import Dashboard from "./components/Dashboard";
import Exercises from "./components/Exercises";
import BodyTracking from "./components/BodyTracking";
import Alarms from "./components/Alarms";
import Budget from "./components/Budget";
import BottomNav from "./components/BottomNav";
import "./App.css";

function AppContent() {
  const { profile, logout } = useProfile();
  const [tab, setTab] = useState("dashboard");
  const [exerciseSession, setExerciseSession] = useState(null);

  if (!profile) return <ProfileSelect />;

  const navigateToExercises = (session) => {
    setExerciseSession(session);
    setTab("exercises");
  };

  const handleTabChange = (newTab) => {
    if (newTab !== "exercises") setExerciseSession(null);
    setTab(newTab);
  };

  return (
    <div className="app-shell">
      <header className="top-bar">
        <span className="top-bar-logo">FitCouple</span>
        <button className="top-bar-profile" onClick={logout}>
          {profile === "adam" ? "Adam" : "Andréa"}
        </button>
      </header>

      <main className="main-content" key={tab}>
        {tab === "dashboard" && <Dashboard onNavigateToExercises={navigateToExercises} />}
        {tab === "exercises" && <Exercises defaultSession={exerciseSession} />}
        {tab === "body" && <BodyTracking />}
        {tab === "alarms" && <Alarms />}
        {tab === "budget" && <Budget />}
      </main>

      <BottomNav active={tab} onChange={handleTabChange} />
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
