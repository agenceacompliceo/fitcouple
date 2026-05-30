import { useState } from "react";
import { ProfileProvider, useProfile } from "./context/ProfileContext";
import ProfileSelect from "./components/ProfileSelect";
import Dashboard from "./components/Dashboard";
import Exercises from "./components/Exercises";
import BMI from "./components/BMI";
import Alarms from "./components/Alarms";
import BottomNav from "./components/BottomNav";
import "./App.css";

function AppContent() {
  const { profile } = useProfile();
  const [tab, setTab] = useState("dashboard");

  if (!profile) return <ProfileSelect />;

  return (
    <div className="app-shell">
      <header className="top-bar">
        <span className="top-bar-logo">FitCouple</span>
        <span className="top-bar-profile">{profile === "adam" ? "Adam" : "Andréa"}</span>
      </header>

      <main className="main-content">
        {tab === "dashboard" && <Dashboard />}
        {tab === "exercises" && <Exercises />}
        {tab === "bmi" && <BMI />}
        {tab === "alarms" && <Alarms />}
      </main>

      <BottomNav active={tab} onChange={setTab} />
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
