import { useProfile } from "../context/ProfileContext";
import { adamSchedule, adamProgram, adamMacros } from "../data/adam";
import { andreaSchedule, andreaProgram, andreaMacros } from "../data/andrea";
import { motivationsAdam, motivationsAndrea } from "../data/motivations";

const DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre"
];

function getDailyMotivation(motivations) {
  const day = new Date().getDay();
  return motivations[day % motivations.length];
}

const PROGRAM_LABELS = {
  push: "Push 💪",
  pull: "Pull 🔙",
  legs: "Legs 🦵",
  rest: "Repos 😴",
  glutes: "Fessiers 🍑",
  hiit: "HIIT ⚡",
  cardio: "Cardio 🏃",
};

export default function Dashboard() {
  const { profile } = useProfile();
  const isAdam = profile === "adam";

  const schedule = isAdam ? adamSchedule : andreaSchedule;
  const program = isAdam ? adamProgram : andreaProgram;
  const macros = isAdam ? adamMacros : andreaMacros;
  const motivations = isAdam ? motivationsAdam : motivationsAndrea;

  const now = new Date();
  const dayOfWeek = now.getDay();
  const dayOfMonth = now.getDate();
  const month = MONTHS[now.getMonth()];
  const dayName = DAYS[dayOfWeek];
  const todayProgram = program[dayOfWeek % program.length];
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  const isCurrentSlot = (time) => {
    const [h, m] = time.split(":").map(Number);
    const slotMinutes = h * 60 + m;
    const nowMinutes = currentHour * 60 + currentMinutes;
    return nowMinutes >= slotMinutes && nowMinutes < slotMinutes + 90;
  };

  const isPast = (time) => {
    const [h, m] = time.split(":").map(Number);
    return currentHour * 60 + currentMinutes > h * 60 + m + 90;
  };

  return (
    <div className="screen">
      <div className="dashboard-header">
        <div className="date-block">
          <span className="day-name">{dayName}</span>
          <span className="day-date">{dayOfMonth} {month}</span>
        </div>
        <div className="today-program">
          <span className="program-label">Aujourd'hui</span>
          <span className="program-type">{PROGRAM_LABELS[todayProgram]}</span>
        </div>
      </div>

      <div className="motivation-banner">
        <p>"{getDailyMotivation(motivations)}"</p>
      </div>

      <div className="macros-strip">
        <div className="macro-item">
          <span className="macro-value">{macros.calories}</span>
          <span className="macro-label">kcal</span>
        </div>
        <div className="macro-sep">|</div>
        <div className="macro-item">
          <span className="macro-value">{macros.protein}g</span>
          <span className="macro-label">protéines</span>
        </div>
        <div className="macro-sep">|</div>
        <div className="macro-item">
          <span className="macro-value">{macros.carbs}g</span>
          <span className="macro-label">glucides</span>
        </div>
        <div className="macro-sep">|</div>
        <div className="macro-item">
          <span className="macro-value">{macros.fat}g</span>
          <span className="macro-label">lipides</span>
        </div>
      </div>

      <h2 className="section-title">Planning du jour</h2>

      <div className="timeline">
        {schedule.map((slot, i) => {
          const current = isCurrentSlot(slot.time);
          const past = isPast(slot.time);
          return (
            <div
              key={i}
              className={`timeline-item ${current ? "current" : ""} ${past ? "past" : ""} type-${slot.type}`}
            >
              <div className="timeline-time">
                <span className="time-label">{slot.time}</span>
                {current && <span className="now-dot" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-icon">{slot.icon}</div>
                <div className="timeline-text">
                  <span className="timeline-label">{slot.label}</span>
                  {slot.detail && <span className="timeline-detail">{slot.detail}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
