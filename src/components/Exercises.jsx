import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { adamExercises, adamProgram } from "../data/adam";
import { andreaExercises, andreaProgram } from "../data/andrea";
import {
  IconChevronDown, IconChevronUp, IconBrandYoutube, IconCheck,
} from "@tabler/icons-react";

const DAYS_SHORT = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export default function Exercises({ defaultSession }) {
  const { profile } = useProfile();
  const isAdam = profile === "adam";

  const exercises = isAdam ? adamExercises : andreaExercises;
  const program = isAdam ? adamProgram : andreaProgram;
  const workoutKeys = Object.keys(exercises);

  const todayIdx = new Date().getDay();
  const todayWorkout = program[todayIdx % program.length];

  const [selected, setSelected] = useState(() => {
    if (defaultSession && workoutKeys.includes(defaultSession)) return defaultSession;
    if (workoutKeys.includes(todayWorkout)) return todayWorkout;
    return workoutKeys[0];
  });
  const [expanded, setExpanded] = useState(null);
  const [done, setDone] = useState({});

  useEffect(() => {
    if (defaultSession && workoutKeys.includes(defaultSession)) {
      setSelected(defaultSession);
      setExpanded(null);
    }
  }, [defaultSession]);

  const toggleDone = (idx) => setDone((d) => ({ ...d, [idx]: !d[idx] }));

  const current = exercises[selected];

  return (
    <div className="screen">
      <h2 className="page-title">Exercices</h2>

      {todayWorkout !== "rest" && exercises[todayWorkout] ? (
        <div className="today-banner">
          Aujourd'hui : <strong>{exercises[todayWorkout].label.split(" — ")[0]}</strong>
        </div>
      ) : (
        <div className="today-banner rest">Aujourd'hui : Repos — récupération active</div>
      )}

      <div className="workout-tabs">
        {workoutKeys.map((key) => (
          <button
            key={key}
            className={`workout-tab ${selected === key ? "active" : ""}`}
            onClick={() => { setSelected(key); setExpanded(null); setDone({}); }}
          >
            {exercises[key].label.split(" — ")[0]}
          </button>
        ))}
      </div>

      <div className="session-header">
        <span className="session-label">{current.label}</span>
        <span className="session-count">{Object.values(done).filter(Boolean).length}/{current.exercises.length}</span>
      </div>

      <div className="exercise-list">
        {current.exercises.map((ex, i) => (
          <div key={i} className={`exercise-card ${done[i] ? "done" : ""}`}>
            <button className="exercise-header" onClick={() => setExpanded(expanded === i ? null : i)}>
              <button
                className={`ex-check ${done[i] ? "checked" : ""}`}
                onClick={(e) => { e.stopPropagation(); toggleDone(i); }}
              >
                {done[i] && <IconCheck size={12} stroke={2.5} />}
              </button>
              <div className="ex-info">
                <span className="ex-name">{ex.name}</span>
                <span className="ex-sets">{ex.sets}</span>
              </div>
              {expanded === i ? <IconChevronUp size={16} stroke={1.5} /> : <IconChevronDown size={16} stroke={1.5} />}
            </button>
            {expanded === i && (
              <div className="exercise-body">
                <p className="ex-tip">{ex.tip}</p>
                <a href={ex.url} target="_blank" rel="noopener noreferrer" className="yt-link">
                  <IconBrandYoutube size={16} stroke={1.5} />
                  Voir la démonstration
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="weekly-plan">
        <h3 className="section-title">Programme hebdo</h3>
        <div className="weekly-grid">
          {DAYS_SHORT.map((day, i) => {
            const workout = program[i % program.length];
            const isToday = i === todayIdx;
            const isRest = workout === "rest";
            return (
              <button
                key={i}
                className={`weekly-day ${isToday ? "today" : ""} ${isRest ? "rest" : ""}`}
                onClick={() => { if (!isRest && workoutKeys.includes(workout)) { setSelected(workout); setExpanded(null); }}}
              >
                <span className="wd-name">{day}</span>
                <span className="wd-workout">{isRest ? "Repos" : (exercises[workout]?.label.split(" — ")[0] ?? "")}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
