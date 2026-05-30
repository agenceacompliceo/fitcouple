import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { alarmsDb } from "../lib/db";
import { IconBell, IconBellOff, IconPlus, IconTrash, IconX } from "@tabler/icons-react";

const KEY = "fitcouple_alarms_";
const CUSTOM_KEY = "fitcouple_alarms_custom_";

const PRESET_ALARMS = [
  { id: "wake", label: "Réveil", time: "08:30", description: "C'est l'heure de se lever !" },
  { id: "supplements", label: "Compléments matin", time: "08:45", description: "Prends tes compléments du matin." },
  { id: "booster", label: "Booster pré-workout", time: "10:30", description: "Prépare ton booster — entraînement dans 30 min !" },
  { id: "body-tracking", label: "Mesures hebdo", time: "09:00", description: "C'est lundi — saisis tes mesures de la semaine !" },
  { id: "sleep", label: "Coucher", time: "23:00", description: "Temps de récupérer. À demain !" },
];

function getPermission() {
  if (!("Notification" in window)) return "unsupported";
  return Notification.permission;
}

function scheduleNotif(alarm) {
  const [h, m] = alarm.time.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(h, m, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification(`FitCouple — ${alarm.label}`, { body: alarm.description });
    }
  }, target - now);
}

export default function Alarms() {
  const { profile } = useProfile();
  const [permission, setPermission] = useState(getPermission);
  const [active, setActive] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY + profile)) || {}; } catch { return {}; }
  });
  const [custom, setCustom] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CUSTOM_KEY + profile)) || []; } catch { return []; }
  });
  const [timeouts, setTimeouts] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    alarmsDb.getState(profile).then((data) => {
      if (!data) return;
      setActive(data.active);
      setCustom(data.custom);
    });
  }, [profile]);

  useEffect(() => { localStorage.setItem(KEY + profile, JSON.stringify(active)); }, [active, profile]);
  useEffect(() => { localStorage.setItem(CUSTOM_KEY + profile, JSON.stringify(custom)); }, [custom, profile]);

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const toggle = (alarm) => {
    const k = alarm.id;
    if (permission !== "granted") { requestPermission(); return; }
    if (active[k]) {
      clearTimeout(timeouts[k]);
      setTimeouts((t) => { const n = { ...t }; delete n[k]; return n; });
      setActive((a) => { const n = { ...a }; delete n[k]; return n; });
      alarmsDb.setActive(profile, k, false, alarm);
    } else {
      const id = scheduleNotif(alarm);
      setTimeouts((t) => ({ ...t, [k]: id }));
      setActive((a) => ({ ...a, [k]: true }));
      alarmsDb.setActive(profile, k, true, alarm);
    }
  };

  const addCustom = async (e) => {
    e.preventDefault();
    if (!newLabel.trim() || !newTime) return;
    const tempId = crypto.randomUUID();
    const alarm = { id: tempId, label: newLabel.trim(), time: newTime, description: `Rappel : ${newLabel.trim()}` };
    setCustom((prev) => [...prev, alarm]);
    setNewLabel(""); setNewTime(""); setShowForm(false);
    const serverId = await alarmsDb.addCustom(profile, alarm);
    if (serverId) {
      setCustom((prev) => prev.map((a) => a.id === tempId ? { ...a, id: serverId } : a));
    }
  };

  const deleteCustom = (id) => {
    if (timeouts[id]) clearTimeout(timeouts[id]);
    setActive((a) => { const n = { ...a }; delete n[id]; return n; });
    setCustom((c) => c.filter((a) => a.id !== id));
    alarmsDb.deleteCustom(profile, id);
  };

  const allAlarms = [...PRESET_ALARMS, ...custom];

  return (
    <div className="screen">
      <div className="screen-header">
        <h2 className="page-title">Rappels</h2>
        <button className="btn-icon-round" onClick={() => setShowForm(!showForm)}>
          {showForm ? <IconX size={18} stroke={2} /> : <IconPlus size={18} stroke={2} />}
        </button>
      </div>

      {permission === "unsupported" && (
        <div className="notif-banner error">Les notifications ne sont pas supportées par ce navigateur.</div>
      )}
      {permission === "default" && (
        <div className="notif-banner">
          <p>Autorise les notifications pour recevoir tes rappels.</p>
          <button className="btn-primary" onClick={requestPermission}>Autoriser</button>
        </div>
      )}
      {permission === "denied" && (
        <div className="notif-banner error">Notifications bloquées — active-les dans les réglages du navigateur.</div>
      )}
      {permission === "granted" && (
        <div className="notif-banner success">Notifications activées</div>
      )}

      {showForm && (
        <form className="card alarm-form" onSubmit={addCustom}>
          <div className="input-grid-2">
            <div className="input-group">
              <label>Nom du rappel</label>
              <input type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Créatine, étirements…" required />
            </div>
            <div className="input-group">
              <label>Heure</label>
              <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} required />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Annuler</button>
            <button type="submit" className="btn-primary">Créer</button>
          </div>
        </form>
      )}

      <div className="alarm-list">
        {allAlarms.map((alarm) => {
          const isActive = !!active[alarm.id];
          const isCustom = alarm.id.startsWith("c_");
          return (
            <div key={alarm.id} className={`alarm-row ${isActive ? "active" : ""}`}>
              <div className="alarm-icon-wrap">
                {isActive ? <IconBell size={18} stroke={1.5} /> : <IconBellOff size={18} stroke={1.5} />}
              </div>
              <div className="alarm-info">
                <span className="alarm-label">{alarm.label}</span>
                <span className="alarm-time">{alarm.time}</span>
              </div>
              <div className="alarm-actions">
                {isCustom && (
                  <button className="btn-ghost-sm" onClick={() => deleteCustom(alarm.id)}>
                    <IconTrash size={14} stroke={1.5} />
                  </button>
                )}
                <button
                  className={`toggle-switch ${isActive ? "on" : ""}`}
                  onClick={() => toggle(alarm)}
                  disabled={permission === "denied" || permission === "unsupported"}
                >
                  <span className="toggle-thumb" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="alarms-note">L'application doit rester ouverte dans le navigateur pour que les rappels fonctionnent.</p>
    </div>
  );
}
