/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", password: "" });

  const login = (userData) => {
    setUser(userData);
  };
  const authUser = () => {
    if (user.username === "admin" && user.password === "admin") return user;
    return null;
  }
  return (
    <AuthContext.Provider value={{ user, login, authUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
