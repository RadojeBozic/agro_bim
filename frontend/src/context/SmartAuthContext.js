import { createContext, useContext, useEffect, useState } from "react";
import { getSmartUser, login as apiLogin, logout as apiLogout, register as apiRegister } from "../helpers/authSmart";

const SmartAuthContext = createContext();

export const SmartAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Na početku proveri da li je korisnik već prijavljen
  useEffect(() => {
    getSmartUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Funkcija za login
  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    setUser(res.data.user);
    return res;
  };

  // Funkcija za registraciju
  const register = async (formData) => {
    const res = await apiRegister(formData);
    setUser(res.data.user);
    return res;
  };

  // Funkcija za logout
  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <SmartAuthContext.Provider value={{ user, login, logout, register, loading, isLoggedIn: !!user }}>
      {children}
    </SmartAuthContext.Provider>
  );
};

// Hook za pristup iz bilo kog komponenta
export const useSmartAuth = () => useContext(SmartAuthContext);
