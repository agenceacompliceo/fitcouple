import { createContext, useContext, useState } from "react";

const ProfileContext = createContext(null);

function loadSportTime(profile) {
  if (!profile) return "morning";
  return localStorage.getItem(`fitcouple_sport_time_${profile}`) || "morning";
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => localStorage.getItem("fitcouple_profile") || null);
  const [sportTime, setSportTimeState] = useState(() => loadSportTime(localStorage.getItem("fitcouple_profile")));

  const selectProfile = (name) => {
    setProfile(name);
    localStorage.setItem("fitcouple_profile", name);
    setSportTimeState(loadSportTime(name));
  };

  const setSportTime = (time) => {
    setSportTimeState(time);
    if (profile) localStorage.setItem(`fitcouple_sport_time_${profile}`, time);
  };

  const logout = () => {
    setProfile(null);
    localStorage.removeItem("fitcouple_profile");
  };

  return (
    <ProfileContext.Provider value={{ profile, selectProfile, logout, sportTime, setSportTime }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
