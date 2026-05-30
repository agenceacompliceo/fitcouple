import { useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { ADAM } from "../data/adam";
import { ANDREA } from "../data/andrea";
import { motivationsAdam, motivationsAndrea } from "../data/motivations";
import {
  IconSun, IconPill, IconToolsKitchen2,
  IconHeart, IconBarbell, IconArrowRight, IconLeaf,
  IconChevronLeft, IconChevronRight,
} from "@tabler/icons-react";

const DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const MAX_OFFSET = 7;

const ICON_MAP = {
  skin: IconHeart,
  supp: IconPill,
  pdj: IconToolsKitchen2,
  food: IconToolsKitchen2,
  sport: IconBarbell,
  rest: IconLeaf,
};

const PROGRAM_LABELS = {
  push: "Push", pull: "Pull", legs: "Legs", rest: "Repos",
  fessA: "Fessiers A", hiit: "HIIT", full: "Full body",
  fessB: "Fessiers B", cardio: "Cardio", fessC: "Fessiers C",
};

function getDailyMotivation(motivations) {
  return motivations[new Date().getDay() % motivations.length];
}

export default function Dashboard({ onNavigateToExercises }) {
  const { profile } = useProfile();
  const [dayOffset, setDayOffset] = useState(0);

  const isAdam = profile === "adam";
  const data = isAdam ? ADAM : ANDREA;
  const motivations = isAdam ? motivationsAdam : motivationsAndrea;

  const displayDate = new Date();
  displayDate.setDate(displayDate.getDate() + dayOffset);
  const dayOfWeek = displayDate.getDay();
  const isToday = dayOffset === 0;

  const semaineIdx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const dayData = data.semaine[semaineIdx];

  const isRestDay = !dayData.sport;
  const sportSlot = dayData.planning.find((s) => s.type === "sport");
  const todayProgram = sportSlot?.seance ?? "rest";
  const chipLabel = PROGRAM_LABELS[todayProgram] ?? dayData.focus.split(" — ")[0];

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const slotMins = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const isCurrentSlot = (t) => isToday && nowMinutes >= slotMins(t) && nowMinutes < slotMins(t) + 90;
  const isPast = (t) => dayOffset < 0 || (isToday && nowMinutes > slotMins(t) + 90);
  const isSportSlot = (slot) => slot.type === "sport" && !isRestDay && isToday;

  const dayLabel = `${DAYS[dayOfWeek]} ${displayDate.getDate()} ${MONTHS[displayDate.getMonth()]}`;

  return (
    <div className="screen">
      <div className="dashboard-header">
        <div className="day-nav">
          <button
            className="btn-ghost day-nav-btn"
            onClick={() => setDayOffset((d) => Math.max(-MAX_OFFSET, d - 1))}
            disabled={dayOffset <= -MAX_OFFSET}
          >
            <IconChevronLeft size={18} stroke={1.5} />
          </button>
          <div className="day-info">
            <div className="day-name">
              {DAYS[dayOfWeek]}
              {isToday && <span className="today-dot" />}
            </div>
            <div className="day-date">{displayDate.getDate()} {MONTHS[displayDate.getMonth()]}</div>
          </div>
          <button
            className="btn-ghost day-nav-btn"
            onClick={() => setDayOffset((d) => Math.min(MAX_OFFSET, d + 1))}
            disabled={dayOffset >= MAX_OFFSET}
          >
            <IconChevronRight size={18} stroke={1.5} />
          </button>
        </div>
        <div className={`today-chip ${isRestDay ? "rest" : ""}`}>
          {chipLabel}
        </div>
      </div>

      {isToday && (
        <div className="motivation-card">
          <p>{getDailyMotivation(motivations)}</p>
        </div>
      )}

      <h3 className="section-title">Planning — {dayLabel}</h3>

      <div className="timeline">
        {dayData.planning.map((slot, i) => {
          const current = isCurrentSlot(slot.t);
          const past = isPast(slot.t);
          const Icon = ICON_MAP[slot.type] || IconSun;
          const clickable = isSportSlot(slot);

          const inner = (
            <div className={`timeline-item ${current ? "current" : ""} ${past ? "past" : ""} ${slot.type === "rest" ? "rest-slot" : ""}`}>
              <div className="tl-time">
                <span>{slot.t}</span>
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
