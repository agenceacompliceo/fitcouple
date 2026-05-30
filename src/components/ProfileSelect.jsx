import { useProfile } from "../context/ProfileContext";
import { motivationsAdam, motivationsAndrea } from "../data/motivations";

function getDailyMotivation(motivations) {
  return motivations[new Date().getDay() % motivations.length];
}

export default function ProfileSelect() {
  const { selectProfile } = useProfile();

  return (
    <div className="profile-select">
      <p className="profile-select-sub">Qui s'entraîne aujourd'hui ?</p>

      <div className="profile-cards">
        {[
          {
            name: "adam",
            displayName: "Adam",
            goal: "Prise de masse",
            tags: ["Push / Pull / Legs", "3 200 kcal", "200g protéines"],
            motivations: motivationsAdam,
          },
          {
            name: "andrea",
            displayName: "Andréa",
            goal: "Affinage & Fessiers",
            tags: ["Fessiers / HIIT / Cardio", "1 800 kcal", "140g protéines"],
            motivations: motivationsAndrea,
          },
        ].map(({ name, displayName, goal, tags, motivations }) => (
          <button key={name} className={`profile-card profile-${name}`} onClick={() => selectProfile(name)}>
            <div className="profile-initial">{displayName[0]}</div>
            <div className="profile-body">
              <div className="profile-name">{displayName}</div>
              <div className="profile-goal">{goal}</div>
              <div className="profile-tags">
                {tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <p className="profile-motivation">"{getDailyMotivation(motivations)}"</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
