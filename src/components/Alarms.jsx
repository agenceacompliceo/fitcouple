import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";

const STORAGE_KEY = "fitcouple_alarms";

const PRESET_ALARMS = [
  { id: "wake", label: "Réveil", time: "08:30", icon: "☀️", description: "C'est l'heure de se lever !" },
  { id: "supplements", label: "Compléments matin", time: "08:45", icon: "💊", description: "Prends tes compléments du matin." },
  { id: "booster", label: "Booster pré-workout", time: "10:30", icon: "⚡", description: "Prépare ton booster, entraînement dans 30 min !" },
  { id: "sleep", label: "Coucher", time: "23:00", icon: "🌙", description: "Temps de récupérer. À demain !" },
];

function getPermissionStatus() {
  if (!("Notification" in window)) return "unsupported";
  return Notification.permission;
}

function scheduleNotification(alarm) {
  const [hours, minutes] = alarm.time.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  const delay = target.getTime() - now.getTime();
  const timeoutId = setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification(`FitCouple — ${alarm.label}`, {
        body: alarm.description,
        icon: "/vite.svg",
        badge: "/vite.svg",
      });
    }
  }, delay);
  return timeoutId;
}

export default function Alarms() {
  const { profile } = useProfile();
  const [permission, setPermission] = useState(getPermissionStatus());
  const [activeAlarms, setActiveAlarms] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY + "_" + profile)) || {};
    } catch {
      return {};
    }
  });
  const [customLabel, setCustomLabel] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [customAlarms, setCustomAlarms] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY + "_custom_" + profile)) || [];
    } catch {
      return [];
    }
  });
  const [timeouts, setTimeouts] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + "_" + profile, JSON.stringify(activeAlarms));
  }, [activeAlarms, profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + "_custom_" + profile, JSON.stringify(customAlarms));
  }, [customAlarms, profile]);

  const requestPermission = async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const toggleAlarm = (alarm) => {
    if (permission !== "granted") {
      requestPermission();
      return;
    }
    const key = alarm.id || alarm.label;
    if (activeAlarms[key]) {
      clearTimeout(timeouts[key]);
      setTimeouts((prev) => { const n = { ...prev }; delete n[key]; return n; });
      setActiveAlarms((prev) => { const n = { ...prev }; delete n[key]; return n; });
    } else {
      const id = scheduleNotification(alarm);
      setTimeouts((prev) => ({ ...prev, [key]: id }));
      setActiveAlarms((prev) => ({ ...prev, [key]: true }));
    }
  };

  const addCustomAlarm = (e) => {
    e.preventDefault();
    if (!customLabel.trim() || !customTime) return;
    const alarm = {
      id: `custom_${Date.now()}`,
      label: customLabel.trim(),
      time: customTime,
      icon: "🔔",
      description: `Rappel : ${customLabel.trim()}`,
    };
    setCustomAlarms((prev) => [...prev, alarm]);
    setCustomLabel("");
    setCustomTime("");
    setShowForm(false);
  };

  const deleteCustomAlarm = (id) => {
    const key = id;
    if (timeouts[key]) clearTimeout(timeouts[key]);
    setTimeouts((prev) => { const n = { ...prev }; delete n[key]; return n; });
    setActiveAlarms((prev) => { const n = { ...prev }; delete n[key]; return n; });
    setCustomAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  const allAlarms = [...PRESET_ALARMS, ...customAlarms];

  return (
    <div className="screen">
      <h2 className="section-title">Alarmes & Rappels</h2>

      {permission === "unsupported" && (
        <div className="notif-banner error">
          Les notifications ne sont pas supportées par ce navigateur.
        </div>
      )}

      {permission === "default" && (
        <div className="notif-banner">
          <p>Active les notifications pour recevoir tes rappels.</p>
          <button className="btn-primary" onClick={requestPermission}>
            Autoriser les notifications
          </button>
        </div>
      )}

      {permission === "denied" && (
        <div className="notif-banner error">
          Les notifications sont bloquées. Active-les dans les paramètres du navigateur.
        </div>
      )}

      {permission === "granted" && (
        <div className="notif-banner success">
          Notifications activées ✓
        </div>
      )}

      <div className="alarms-list">
        {allAlarms.map((alarm) => {
          const key = alarm.id || alarm.label;
          const isActive = !!activeAlarms[key];
          return (
            <div key={key} className={`alarm-card ${isActive ? "active" : ""}`}>
              <div className="alarm-icon">{alarm.icon}</div>
              <div className="alarm-info">
                <span className="alarm-label">{alarm.label}</span>
                <span className="alarm-time">{alarm.time}</span>
              </div>
              <div className="alarm-actions">
                {alarm.id?.startsWith("custom_") && (
                  <button
                    className="alarm-delete"
                    onClick={() => deleteCustomAlarm(alarm.id)}
                    aria-label="Supprimer"
                  >
                    ×
                  </button>
                )}
                <button
                  className={`alarm-toggle ${isActive ? "on" : "off"}`}
                  onClick={() => toggleAlarm(alarm)}
                  disabled={permission === "denied" || permission === "unsupported"}
                >
                  {isActive ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn-secondary add-alarm-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Annuler" : "+ Ajouter un rappel"}
      </button>

      {showForm && (
        <form className="custom-alarm-form" onSubmit={addCustomAlarm}>
          <div className="input-group">
            <label>Nom du rappel</label>
            <input
              type="text"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder="Ex: Prise de créatine"
              required
            />
          </div>
          <div className="input-group">
            <label>Heure</label>
            <input
              type="time"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Créer le rappel</button>
        </form>
      )}

      <div className="alarms-note">
        <p>Les alarmes se déclenchent une fois par jour à l'heure choisie. L'application doit rester ouverte dans le navigateur.</p>
      </div>
    </div>
  );
}
