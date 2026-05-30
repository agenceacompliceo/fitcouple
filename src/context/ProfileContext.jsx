import { createContext, useContext, useState } from "react";
import { profilesDb } from "../lib/db";

const ProfileContext = createContext(null);

function loadSportTime(profile) {
  if (!profile) return "morning";
  return localStorage.getItem(`fitcouple_sport_time_${profile}`) || "morning";
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => localStorage.getItem("fitcouple_profile") || null);
  const [sportTime, setSportTimeState] = useState(() => loadSportTime(localStorage.getItem("fitcouple_profile")));
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState(null);

  const selectProfile = (name) => {
    setProfile(name);
    setLoading(true);
    setDbError(null);
    localStorage.setItem("fitcouple_profile", name);
    setSportTimeState(loadSportTime(name));

    profilesDb.get(name)
      .then((data) => {
        if (data?.sportTime) {
          setSportTimeState(data.sportTime);
          localStorage.setItem(`fitcouple_sport_time_${name}`, data.sportTime);
        }
      })
      .catch((err) => {
        console.error("[ProfileContext] selectProfile error:", err);
        setDbError("Impossible de joindre Supabase — mode hors ligne activé.");
      })
      .finally(() => setLoading(false));
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
    <ProfileContext.Provider value={{ profile, selectProfile, logout, sportTime, setSportTime, loading, dbError }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
