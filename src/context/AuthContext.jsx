// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    async function fetchMe(){
      try{
        if(!token) return;
        const res = await fetch("http://localhost:5001/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if(res.ok) setUser(data.user);
      }catch{}
    }
    fetchMe();
  }, [token]);

  function loginSuccess({ token, user }) {
    localStorage.setItem("token", token);
    setUser(user);
  }
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthCtx.Provider value={{ user, loginSuccess, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
