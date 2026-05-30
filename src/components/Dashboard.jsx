import { useProfile } from "../context/ProfileContext";
import { adamSchedule, adamProgram, adamMacros } from "../data/adam";
import { andreaSchedule, andreaProgram, andreaMacros } from "../data/andrea";
import { motivationsAdam, motivationsAndrea } from "../data/motivations";
import {
  IconSun, IconMoon, IconPill, IconFlame, IconToolsKitchen2,
  IconHeart, IconBarbell, IconArrowRight,
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
};

const PROGRAM_LABELS = {
  push: "Push",
  pull: "Pull",
  legs: "Legs",
  rest: "Repos",
  glutes: "Fessiers",
  hiit: "HIIT",
  cardio: "Cardio",
};

function getDailyMotivation(motivations) {
  return motivations[new Date().getDay() % motivations.length];
}

export default function Dashboard({ onNavigateToExercises }) {
  const { profile, logout } = useProfile();
  const isAdam = profile === "adam";

  const schedule = isAdam ? adamSchedule : andreaSchedule;
  const program = isAdam ? adamProgram : andreaProgram;
  const macros = isAdam ? adamMacros : andreaMacros;
  const motivations = isAdam ? motivationsAdam : motivationsAndrea;

  const now = new Date();
  const dayOfWeek = now.getDay();
  const todayProgram = program[dayOfWeek % program.length];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const slotMinutes = (time) => { const [h, m] = time.split(":").map(Number); return h * 60 + m; };
  const isCurrentSlot = (time) => { const sm = slotMinutes(time); return nowMinutes >= sm && nowMinutes < sm + 90; };
  const isPast = (time) => nowMinutes > slotMinutes(time) + 90;

  return (
    <div className="screen">
      <div className="dashboard-header">
        <div>
          <div className="day-name">{DAYS[dayOfWeek]}</div>
          <div className="day-date">{now.getDate()} {MONTHS[now.getMonth()]}</div>
        </div>
        <div className="today-chip">
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
          const isSport = slot.type === "sport" && todayProgram !== "rest";

          const content = (
            <div className={`timeline-item ${current ? "current" : ""} ${past ? "past" : ""}`}>
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
                {isSport && <IconArrowRight size={16} stroke={1.5} className="tl-arrow" />}
              </div>
            </div>
          );

          if (isSport) {
            return (
              <button key={i} className="timeline-btn" onClick={() => onNavigateToExercises(todayProgram)}>
                {content}
              </button>
            );
          }
          return <div key={i}>{content}</div>;
        })}
      </div>
    </div>
  );
}
