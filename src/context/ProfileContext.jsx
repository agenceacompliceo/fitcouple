import { createContext, useContext, useState } from "react";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => localStorage.getItem("fitcouple_profile") || null);

  const selectProfile = (name) => {
    setProfile(name);
    localStorage.setItem("fitcouple_profile", name);
  };

  const logout = () => {
    setProfile(null);
    localStorage.removeItem("fitcouple_profile");
  };

  return (
    <ProfileContext.Provider value={{ profile, selectProfile, logout }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
