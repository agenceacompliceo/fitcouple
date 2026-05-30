import { useProfile } from "../context/ProfileContext";
import { motivationsAdam, motivationsAndrea } from "../data/motivations";

function getDailyMotivation(motivations) {
  const day = new Date().getDay();
  return motivations[day % motivations.length];
}

export default function ProfileSelect() {
  const { selectProfile } = useProfile();
  const adamMotivation = getDailyMotivation(motivationsAdam);
  const andreaMotivation = getDailyMotivation(motivationsAndrea);

  return (
    <div className="profile-select">
      <div className="app-header">
        <h1>FitCouple</h1>
        <p className="app-tagline">Deux objectifs. Un programme.</p>
      </div>

      <div className="profile-cards">
        <button className="profile-card profile-adam" onClick={() => selectProfile("adam")}>
          <div className="profile-avatar">A</div>
          <div className="profile-name">Adam</div>
          <div className="profile-goal">Prise de masse</div>
          <div className="profile-tags">
            <span className="tag">Push/Pull/Legs</span>
            <span className="tag">3200 kcal</span>
            <span className="tag">200g protéines</span>
          </div>
          <div className="profile-motivation">"{adamMotivation}"</div>
        </button>

        <button className="profile-card profile-andrea" onClick={() => selectProfile("andrea")}>
          <div className="profile-avatar">A</div>
          <div className="profile-name">Andréa</div>
          <div className="profile-goal">Affinage & Fessiers</div>
          <div className="profile-tags">
            <span className="tag">Fessiers/HIIT</span>
            <span className="tag">1800 kcal</span>
            <span className="tag">140g protéines</span>
          </div>
          <div className="profile-motivation">"{andreaMotivation}"</div>
        </button>
      </div>
    </div>
  );
}
