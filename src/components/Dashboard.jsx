import { useProfile } from "../context/ProfileContext";
import { adamSchedule, adamScheduleAfternoon, adamProgram, adamMacros } from "../data/adam";
import { andreaSchedule, andreaScheduleAfternoon, andreaProgram, andreaMacros } from "../data/andrea";
import { motivationsAdam, motivationsAndrea } from "../data/motivations";
import {
  IconSun, IconMoon, IconPill, IconFlame, IconToolsKitchen2,
  IconHeart, IconBarbell, IconArrowRight, IconLeaf,
} from "@tabler/icons-react";

const DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const ICON_MAP = {
  sun: IconSun,
  moon: IconMoon,
  pill: IconPill,
  bolt: IconFlame,
  meal: IconToolsKitchen2,
  heart: IconHeart,
  dumbbell: IconBarbell,
  rest: IconLeaf,
};

const PROGRAM_LABELS = {
  push: "Push", pull: "Pull", legs: "Legs", rest: "Repos",
  glutes: "Fessiers", hiit: "HIIT", cardio: "Cardio",
};

function getDailyMotivation(motivations) {
  return motivations[new Date().getDay() % motivations.length];
}

function buildDaySchedule(baseSchedule, isRestDay, sportTime) {
  if (!isRestDay) return baseSchedule;

  // On Sunday: keep meals/supplements/skincare/routine, drop sport & booster
  const filtered = baseSchedule.filter((s) => s.type !== "sport" && s.iconType !== "bolt");

  const restTime = sportTime === "morning" ? "11:00" : "15:00";
  const restSlot = {
    time: restTime,
    label: "Repos — récupération active",
    iconType: "rest",
    type: "rest",
    detail: "Marche 30 min en plein air ou séance de yoga doux — laisse le corps récupérer",
  };

  const result = [...filtered];
  const [rh, rm] = restTime.split(":").map(Number);
  const restMins = rh * 60 + rm;
  const insertIdx = result.findIndex((s) => {
    const [h, m] = s.time.split(":").map(Number);
    return h * 60 + m > restMins;
  });

  if (insertIdx === -1) result.push(restSlot);
  else result.splice(insertIdx, 0, restSlot);

  return result;
}

export default function Dashboard({ onNavigateToExercises }) {
  const { profile, sportTime } = useProfile();
  const isAdam = profile === "adam";

  const baseSchedule = isAdam
    ? (sportTime === "morning" ? adamSchedule : adamScheduleAfternoon)
    : (sportTime === "morning" ? andreaSchedule : andreaScheduleAfternoon);

  const program = isAdam ? adamProgram : andreaProgram;
  const macros = isAdam ? adamMacros : andreaMacros;
  const motivations = isAdam ? motivationsAdam : motivationsAndrea;

  const now = new Date();
  const dayOfWeek = now.getDay();
  const isRestDay = dayOfWeek === 0; // Sunday always rest
  const todayProgram = isRestDay ? "rest" : program[dayOfWeek % program.length];

  const schedule = buildDaySchedule(baseSchedule, isRestDay, sportTime);

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const slotMins = (time) => { const [h, m] = time.split(":").map(Number); return h * 60 + m; };
  const isCurrentSlot = (time) => { const sm = slotMins(time); return nowMinutes >= sm && nowMinutes < sm + 90; };
  const isPast = (time) => nowMinutes > slotMins(time) + 90;

  const isSportSlot = (slot) => slot.type === "sport" && !isRestDay;

  return (
    <div className="screen">
      <div className="dashboard-header">
        <div>
          <div className="day-name">{DAYS[dayOfWeek]}</div>
          <div className="day-date">{now.getDate()} {MONTHS[now.getMonth()]}</div>
        </div>
        <div className={`today-chip ${isRestDay || todayProgram === "rest" ? "rest" : ""}`}>
          {PROGRAM_LABELS[todayProgram]}
        </div>
      </div>

      <div className="motivation-card">
        <p>{getDailyMotivation(motivations)}</p>
      </div>

      <div className="macros-grid">
        {[
          { label: "kcal", value: macros.calories },
          { label: "protéines", value: `${macros.protein}g` },
          { label: "glucides", value: `${macros.carbs}g` },
          { label: "lipides", value: `${macros.fat}g` },
        ].map(({ label, value }) => (
          <div key={label} className="macro-cell">
            <span className="macro-val">{value}</span>
            <span className="macro-lbl">{label}</span>
          </div>
        ))}
      </div>

      <h3 className="section-title">Planning du jour</h3>

      <div className="timeline">
        {schedule.map((slot, i) => {
          const current = isCurrentSlot(slot.time);
          const past = isPast(slot.time);
          const Icon = ICON_MAP[slot.iconType] || IconSun;
          const clickable = isSportSlot(slot);

          const inner = (
            <div className={`timeline-item ${current ? "current" : ""} ${past ? "past" : ""} ${slot.type === "rest" ? "rest-slot" : ""}`}>
              <div className="tl-time">
                <span>{slot.time}</span>
                {current && <span className="now-pill">Maintenant</span>}
              </div>
              <div className={`tl-dot type-${slot.type} ${current ? "current" : ""}`} />
              <div className="tl-content">
                <div className="tl-icon">
                  <Icon size={16} stroke={1.5} />
                </div>
                <div className="tl-text">
                  <span className="tl-label">{slot.label}</span>
                  {slot.detail && <span className="tl-detail">{slot.detail}</span>}
                </div>
                {clickable && <IconArrowRight size={16} stroke={1.5} className="tl-arrow" />}
              </div>
            </div>
          );

          if (clickable) {
            return (
              <button key={i} className="timeline-btn" onClick={() => onNavigateToExercises(todayProgram)}>
                {inner}
              </button>
            );
          }
          return <div key={i}>{inner}</div>;
        })}
      </div>
    </div>
  );
}
