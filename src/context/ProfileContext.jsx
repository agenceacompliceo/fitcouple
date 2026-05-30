import { createContext, useContext, useState } from "react";
import { profilesDb, syncStatus } from "../lib/db";

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
    const localTime = loadSportTime(name);
    setSportTimeState(localTime);
    // Sync from Supabase
    profilesDb.get(name).then((data) => {
      if (data?.sportTime) {
        setSportTimeState(data.sportTime);
        localStorage.setItem(`fitcouple_sport_time_${name}`, data.sportTime);
      }
    });
  };

  const setSportTime = (time) => {
    setSportTimeState(time);
    if (profile) {
      localStorage.setItem(`fitcouple_sport_time_${profile}`, time);
      profilesDb.upsert(profile, { sport_time: time });
    }
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
