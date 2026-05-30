import { useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { adamExercises, adamProgram } from "../data/adam";
import { andreaExercises, andreaProgram } from "../data/andrea";

const DAYS_SHORT = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export default function Exercises() {
  const { profile } = useProfile();
  const isAdam = profile === "adam";

  const exercises = isAdam ? adamExercises : andreaExercises;
  const program = isAdam ? adamProgram : andreaProgram;
  const todayIdx = new Date().getDay();
  const todayWorkout = program[todayIdx % program.length];

  const workoutKeys = Object.keys(exercises);
  const [selected, setSelected] = useState(
    workoutKeys.includes(todayWorkout) ? todayWorkout : workoutKeys[0]
  );
  const [expanded, setExpanded] = useState(null);

  const current = exercises[selected];

  return (
    <div className="screen">
      <h2 className="section-title">Exercices</h2>

      <div className="today-banner">
        Programme du jour :{" "}
        <strong>{todayWorkout === "rest" ? "Repos 😴" : (exercises[todayWorkout]?.label || "Repos 😴")}</strong>
      </div>

      <div className="workout-tabs">
        {workoutKeys.map((key) => (
          <button
            key={key}
            className={`workout-tab ${selected === key ? "active" : ""}`}
            onClick={() => { setSelected(key); setExpanded(null); }}
          >
            {exercises[key].label.split(" — ")[0]}
          </button>
        ))}
      </div>

      <div className="session-title">{current.label}</div>

      <div className="exercise-list">
        {current.exercises.map((ex, i) => (
          <div key={i} className="exercise-card">
            <button
              className="exercise-header"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="exercise-number">{String(i + 1).padStart(2, "0")}</div>
              <div className="exercise-info">
                <span className="exercise-name">{ex.name}</span>
                <span className="exercise-sets">{ex.sets}</span>
              </div>
              <span className="exercise-chevron">{expanded === i ? "▲" : "▼"}</span>
            </button>

            {expanded === i && (
              <div className="exercise-body">
                <p className="exercise-tip">💡 {ex.tip}</p>
                <a
                  href={ex.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yt-link"
                >
                  ▶ Voir la vidéo YouTube
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
              <div key={i} className={`weekly-day ${isToday ? "today" : ""} ${isRest ? "rest" : ""}`}>
                <span className="weekly-day-name">{day}</span>
                <span className="weekly-day-workout">
                  {isRest ? "Repos" : (exercises[workout]?.label.split(" — ")[0] || "?")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
