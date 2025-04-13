/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  // ✅ Đăng nhập
  const login = async (userData) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const res = await response.json();
      if (!response.ok)
        throw new Error(res.message || "Sai tài khoản hoặc mật khẩu!");

      // Lưu token và user
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem("site", res.token);
      localStorage.setItem("justLoggedIn", "true");
      localStorage.removeItem("aiMessages"); // Xoá lịch sử AI trước đó
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err.message);
      toast.error(err.message);
    }
  };

  // ✅ Xác thực token (dùng khi F5)
  const authUser = async () => {
    const tokenFromStorage = localStorage.getItem("site");
    if (!tokenFromStorage) return;

    try {
      const response = await fetch("http://localhost:3001/auth/verifyToken", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      });

      const res = await response.json();
      if (!response.ok || !res.user) throw new Error("Token hết hạn!");

      // Nếu token hợp lệ, lưu user và token
      setUser(res.user);
      setToken(tokenFromStorage);
    } catch (err) {
      console.error("❌ authUser fail:", err.message);
      logOut(); // Hết hạn thì logout
    }
  };

  // ✅ Đăng xuất
  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("site");
    localStorage.removeItem("aiMessages");
    localStorage.removeItem("justLoggedIn");
    navigate("/login");
  };

  // ✅ Load lại kiểm tra token
  useEffect(() => {
    authUser();
  }, []);

  // ✅ Get email từ token
  const getEmailFromToken = () => {
    const token = localStorage.getItem("site");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.email || null;
    } catch {
      return null;
    }
  };

  // ✅ Get userID từ token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("site");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || null;
    } catch {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        authUser,
        logOut,
        getEmailFromToken,
        getUserIdFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
