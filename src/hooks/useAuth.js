import { useState } from "react";

export default function useAuth() {
  // مقدار اولیه رو مستقیماً از localStorage می‌خونیم
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isLoggedIn = !!token;

  return { token, login, logout, isLoggedIn };
}
