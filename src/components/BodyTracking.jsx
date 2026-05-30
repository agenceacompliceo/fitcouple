import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { getEncouragement } from "../data/encouragements";
import { bodyMeasurements as bm, profilesDb } from "../lib/db";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  IconPlus, IconTrash,
  IconTrendingUp, IconTrendingDown, IconMinus,
} from "@tabler/icons-react";

const BODY_KEY = "fitcouple_body_";
const HEIGHT_KEY = "fitcouple_height_";
const DEFAULT_HEIGHTS = { adam: 180, andrea: 165 };

function getWeekStart(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
  return d.toISOString().split("T")[0];
}

function formatWeekLabel(weekStart) {
  const d = new Date(weekStart + "T12:00:00");
  return `${d.getDate()} ${["jan","fév","mar","avr","mai","juin","juil","août","sep","oct","nov","déc"][d.getMonth()]}`;
}

function formatWeekFull(weekStart) {
  const d = new Date(weekStart + "T12:00:00");
  return `Semaine du ${d.getDate()} ${["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"][d.getMonth()]} ${d.getFullYear()}`;
}

function calcBMI(weight, height) {
  if (!weight || !height) return null;
  const h = height / 100;
  return Math.round((weight / (h * h)) * 10) / 10;
}

function getBMILabel(bmi) {
  if (!bmi) return "";
  if (bmi < 18.5) return "Insuffisance pondérale";
  if (bmi < 25) return "Poids normal";
  if (bmi < 30) return "Surpoids";
  return "Obésité";
}

function ls(key, fallback = null) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-date">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="chart-tooltip-value" style={{ color: p.color }}>
          {p.name} : {p.value}
        </p>
      ))}
    </div>
  );
};

const EMPTY_FORM = { weight: "", waist: "", hips: "", arms: "", thighs: "" };

export default function BodyTracking() {
  const { profile } = useProfile();

  const [entries, setEntries] = useState(() => ls(BODY_KEY + profile, []));
  const [height, setHeight] = useState(() => {
    const s = localStorage.getItem(HEIGHT_KEY + profile);
    return s ? parseFloat(s) : DEFAULT_HEIGHTS[profile] || 170;
  });

  const currentWeek = getWeekStart();
  const thisWeekEntry = entries.find((e) => e.weekStart === currentWeek);

  const [showForm, setShowForm] = useState(false);
  const [chartTab, setChartTab] = useState("weight");
  const [form, setForm] = useState(
    thisWeekEntry
      ? { weight: thisWeekEntry.weight ?? "", waist: thisWeekEntry.waist ?? "", hips: thisWeekEntry.hips ?? "", arms: thisWeekEntry.arms ?? "", thighs: thisWeekEntry.thighs ?? "" }
      : EMPTY_FORM
  );

  // Sync from Supabase on mount
  useEffect(() => {
    bm.getAll(profile).then((data) => {
      if (data !== null) setEntries(data);
    });
    profilesDb.get(profile).then((data) => {
      if (!data) return;
      if (data.height) setHeight(data.height);
    });
  }, [profile]);

  // Persist entries to localStorage
  useEffect(() => {
    localStorage.setItem(BODY_KEY + profile, JSON.stringify(entries));
  }, [entries, profile]);

  // Persist height
  useEffect(() => {
    localStorage.setItem(HEIGHT_KEY + profile, String(height));
    profilesDb.upsert(profile, { height });
  }, [height, profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      weekStart: currentWeek,
      date: new Date().toISOString(),
      weight: parseFloat(form.weight) || null,
      waist: parseFloat(form.waist) || null,
      hips: parseFloat(form.hips) || null,
      arms: parseFloat(form.arms) || null,
      thighs: parseFloat(form.thighs) || null,
    };
    setEntries((prev) =>
      thisWeekEntry ? prev.map((e) => (e.weekStart === currentWeek ? entry : e)) : [...prev, entry]
    );
    bm.upsert(profile, entry);
    setShowForm(false);
  };

  const deleteEntry = (weekStart) => {
    setEntries((prev) => prev.filter((e) => e.weekStart !== weekStart));
    bm.delete(profile, weekStart);
  };

  const latest = entries[entries.length - 1];
  const previous = entries[entries.length - 2];
  const encouragement = getEncouragement(profile, entries);
  const weightDiff = latest?.weight && previous?.weight ? (latest.weight - previous.weight).toFixed(1) : null;
  const bmiBmi = calcBMI(latest?.weight, height);

  const chartSlice = entries.slice(-12);
  const weightChartData = chartSlice.map((e) => ({ week: formatWeekLabel(e.weekStart), Poids: e.weight }));
  const measureChartData = chartSlice.map((e) => ({ week: formatWeekLabel(e.weekStart), Taille: e.waist, Hanches: e.hips, Bras: e.arms, Cuisses: e.thighs }));

  return (
    <div className="screen">
      <div className="screen-header">
        <h2 className="page-title">Suivi corporel</h2>
        <button className="btn-icon-round" onClick={() => { setShowForm(!showForm); if (!showForm && thisWeekEntry) setForm({ weight: thisWeekEntry.weight ?? "", waist: thisWeekEntry.waist ?? "", hips: thisWeekEntry.hips ?? "", arms: thisWeekEntry.arms ?? "", thighs: thisWeekEntry.thighs ?? "" }); }}>
          <IconPlus size={18} stroke={2} />
        </button>
      </div>

      {showForm && (
        <form className="card tracking-form" onSubmit={handleSubmit}>
          <div className="form-week-label">{formatWeekFull(currentWeek)}</div>
          <div className="input-group">
            <label>Taille (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(parseFloat(e.target.value) || height)} min="100" max="250" />
          </div>
          <div className="input-grid-2">
            {[
              { key: "weight", label: "Poids (kg)", placeholder: "75" },
              { key: "waist", label: "Tour de taille (cm)", placeholder: "80" },
              { key: "hips", label: "Tour de hanches (cm)", placeholder: "90" },
              { key: "arms", label: "Tour de bras (cm)", placeholder: "35" },
              { key: "thighs", label: "Tour de cuisses (cm)", placeholder: "55" },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="input-group">
                <label>{label}</label>
                <input type="number" value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} placeholder={placeholder} step="0.1" />
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Annuler</button>
            <button type="submit" className="btn-primary">{thisWeekEntry ? "Mettre à jour" : "Enregistrer"}</button>
          </div>
        </form>
      )}

      {latest ? (
        <>
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-value">{latest.weight ?? "—"}</span>
              <span className="stat-label">kg</span>
              {weightDiff !== null && (
                <span className={`stat-delta ${parseFloat(weightDiff) === 0 ? "" : parseFloat(weightDiff) > 0 ? (profile === "adam" ? "positive" : "negative") : (profile === "andrea" ? "positive" : "negative")}`}>
                  {parseFloat(weightDiff) > 0 ? <IconTrendingUp size={12} stroke={2} /> : parseFloat(weightDiff) < 0 ? <IconTrendingDown size={12} stroke={2} /> : <IconMinus size={12} stroke={2} />}
                  {parseFloat(weightDiff) > 0 ? "+" : ""}{weightDiff}
                </span>
              )}
            </div>
            {bmiBmi && (
              <div className="stat-card">
                <span className="stat-value">{bmiBmi}</span>
                <span className="stat-label">IMC</span>
                <span className="stat-sublabel">{getBMILabel(bmiBmi)}</span>
              </div>
            )}
            {latest.waist && <div className="stat-card"><span className="stat-value">{latest.waist}</span><span className="stat-label">taille cm</span></div>}
            {latest.hips && <div className="stat-card"><span className="stat-value">{latest.hips}</span><span className="stat-label">hanches cm</span></div>}
          </div>

          <div className="encouragement-card">
            <p className="encouragement-text">{encouragement}</p>
            <span className="encouragement-week">{formatWeekFull(latest.weekStart)}</span>
          </div>
        </>
      ) : (
        !showForm && (
          <div className="empty-state">
            <p>Aucune mesure enregistrée.</p>
            <button className="btn-primary" onClick={() => setShowForm(true)}>Commencer le suivi</button>
          </div>
        )
      )}

      {chartSlice.length >= 2 && (
        <div className="card chart-card">
          <div className="chart-tab-row">
            {["weight", "measures"].map((t) => (
              <button key={t} className={`chart-tab ${chartTab === t ? "active" : ""}`} onClick={() => setChartTab(t)}>
                {t === "weight" ? "Poids & IMC" : "Mensurations"}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartTab === "weight" ? weightChartData : measureChartData} margin={{ top: 5, right: 8, left: -22, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fill: "#999", fontSize: 11 }} />
              <YAxis domain={["auto", "auto"]} tick={{ fill: "#999", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              {chartTab === "weight" && <Line type="monotone" dataKey="Poids" stroke="#111" strokeWidth={2} dot={{ fill: "#111", r: 3 }} activeDot={{ r: 5 }} />}
              {chartTab === "measures" && (
                <>
                  <Line type="monotone" dataKey="Taille" stroke="#111" strokeWidth={2} dot={{ fill: "#111", r: 3 }} />
                  <Line type="monotone" dataKey="Hanches" stroke="#555" strokeWidth={2} dot={{ fill: "#555", r: 3 }} />
                  <Line type="monotone" dataKey="Bras" stroke="#888" strokeWidth={1.5} dot={{ fill: "#888", r: 3 }} strokeDasharray="4 2" />
                  <Line type="monotone" dataKey="Cuisses" stroke="#aaa" strokeWidth={1.5} dot={{ fill: "#aaa", r: 3 }} strokeDasharray="2 2" />
                  <Legend iconType="line" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {entries.length > 0 && (
        <div className="history-section">
          <h3 className="section-title">Historique</h3>
          <div className="history-list">
            {[...entries].reverse().map((entry) => (
              <div key={entry.weekStart} className="history-row">
                <div className="history-week-label">{formatWeekFull(entry.weekStart)}</div>
                <div className="history-values">
                  {entry.weight && <span className="hval"><strong>{entry.weight}</strong> kg</span>}
                  {entry.waist && <span className="hval">T {entry.waist}</span>}
                  {entry.hips && <span className="hval">H {entry.hips}</span>}
                  {entry.weight && calcBMI(entry.weight, height) && <span className="hval bmi-pill">IMC {calcBMI(entry.weight, height)}</span>}
                </div>
                <button className="btn-ghost-sm" onClick={() => deleteEntry(entry.weekStart)}>
                  <IconTrash size={14} stroke={1.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
