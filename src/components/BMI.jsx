import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const STORAGE_KEY_PREFIX = "fitcouple_bmi_";

function getBMICategory(bmi) {
  if (bmi < 18.5) return { label: "Insuffisance pondérale", color: "#60a5fa" };
  if (bmi < 25) return { label: "Poids normal", color: "#34d399" };
  if (bmi < 30) return { label: "Surpoids", color: "#fbbf24" };
  return { label: "Obésité", color: "#f87171" };
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip-date">{label}</p>
        <p className="chart-tooltip-value">IMC : {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function BMI() {
  const { profile } = useProfile();
  const storageKey = STORAGE_KEY_PREFIX + profile;

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(history));
  }, [history, storageKey]);

  const calculateBMI = (w, h) => {
    const hm = h / 100;
    return Math.round((w / (hm * hm)) * 10) / 10;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || w < 20 || w > 300 || h < 100 || h > 250) return;
    const bmi = calculateBMI(w, h);
    const entry = {
      date: new Date().toISOString(),
      weight: w,
      height: h,
      bmi,
    };
    setHistory((prev) => [...prev, entry]);
    setWeight("");
    setHeight("");
  };

  const handleDelete = (idx) => {
    setHistory((prev) => prev.filter((_, i) => i !== idx));
  };

  const latest = history[history.length - 1];
  const category = latest ? getBMICategory(latest.bmi) : null;

  const chartData = history.slice(-12).map((e) => ({
    date: formatDate(e.date),
    bmi: e.bmi,
  }));

  return (
    <div className="screen">
      <h2 className="section-title">Calcul IMC</h2>

      <form className="bmi-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-group">
            <label>Poids (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="75"
              min="20"
              max="300"
              step="0.1"
              required
            />
          </div>
          <div className="input-group">
            <label>Taille (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="175"
              min="100"
              max="250"
              step="1"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn-primary">Enregistrer</button>
      </form>

      {latest && (
        <div className="bmi-result">
          <div className="bmi-number" style={{ color: category.color }}>
            {latest.bmi}
          </div>
          <div className="bmi-category" style={{ color: category.color }}>
            {category.label}
          </div>
          <div className="bmi-details">
            {latest.weight} kg · {latest.height} cm
          </div>
        </div>
      )}

      {chartData.length >= 2 && (
        <div className="chart-container">
          <h3 className="chart-title">Évolution IMC</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="date" tick={{ fill: "#888", fontSize: 11 }} />
              <YAxis domain={["auto", "auto"]} tick={{ fill: "#888", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={18.5} stroke="#60a5fa" strokeDasharray="4 4" />
              <ReferenceLine y={25} stroke="#fbbf24" strokeDasharray="4 4" />
              <ReferenceLine y={30} stroke="#f87171" strokeDasharray="4 4" />
              <Line
                type="monotone"
                dataKey="bmi"
                stroke="#fff"
                strokeWidth={2}
                dot={{ fill: "#fff", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="chart-legend">
            <span style={{ color: "#60a5fa" }}>— 18.5</span>
            <span style={{ color: "#fbbf24" }}>— 25</span>
            <span style={{ color: "#f87171" }}>— 30</span>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <h3 className="section-title">Historique</h3>
          <div className="history-list">
            {[...history].reverse().map((entry, i) => {
              const cat = getBMICategory(entry.bmi);
              return (
                <div key={i} className="history-item">
                  <div className="history-date">
                    {new Date(entry.date).toLocaleDateString("fr-FR")}
                  </div>
                  <div className="history-weight">{entry.weight} kg</div>
                  <div className="history-bmi" style={{ color: cat.color }}>
                    IMC {entry.bmi}
                  </div>
                  <button
                    className="history-delete"
                    onClick={() => handleDelete(history.length - 1 - i)}
                    aria-label="Supprimer"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {history.length === 0 && (
        <p className="empty-state">Aucune mesure enregistrée. Saisis ton poids et ta taille pour commencer.</p>
      )}
    </div>
  );
}
