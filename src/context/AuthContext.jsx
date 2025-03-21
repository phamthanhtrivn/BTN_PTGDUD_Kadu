/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const login = (userData) => {
    setUser(userData);
  };
  const authUser = async () => {
    // truongmaiduc18@gmail.com- 1234
    // admin@gmail -admin
    // user@gmail- user
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Sai tài khoản hoặc mật khẩu!");
      }

      const res = await response.json();
      setToken(res.token);
      localStorage.setItem("site", res.token); // Lưu token vào localStorage
      navigate("/");
      toast.success("Đăng nhập thành công!");
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.message);
      alert(err.message);
    }
  }
  // Hàm xử lý đăng xuất
  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("site");
    navigate("/login");
  };
  // Khi refresh trang, tự động lấy lại user từ token
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("site");
    if (tokenFromStorage) {
      // Gọi API xác thực token hoặc decode token ở đây
      fetch("http://localhost:3001/auth/verifyToken", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${tokenFromStorage}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
            setToken(tokenFromStorage);
          } else {
            logOut(); // Token hết hạn
          }
        });
    }
  }, []);
  const getEmailFromToken = () => {
    const token = localStorage.getItem("site");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.email;
  }
  return (
    <AuthContext.Provider value={{ getEmailFromToken, token, user, login, authUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
