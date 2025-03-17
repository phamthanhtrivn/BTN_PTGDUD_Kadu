/* eslint-disable react-hooks/exhaustive-deps */
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";

const Login = () => {
  const { login, authUser, getEmailFromToken } = useAuth();
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    if (inputEmail.current.value === "" || inputPassword.current.value === "") {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const userData = {
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    }
    login(userData);
    setIsLogging(true);
  }
  useEffect(() => {
    if (isLogging) {
      if (authUser()) {
        navigate("/");
      }
      else toast.error("Tài khoản hoặc mật khẩu không đúng");
    }
    console.log(getEmailFromToken());
  }, [isLogging]);
  const inputEmail = useRef();
  const inputPassword = useRef();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 rounded-2xl">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">ĐĂNG NHẬP</h2>

        {/* Hoặc */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">Hoặc tài khoản</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Form nhập tài khoản */}
        <input
          ref={inputEmail}
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:ring-2 focus:ring-green-500 outline-none"
        />
        <input
          ref={inputPassword}
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-green-500 outline-none"
        />

        {/* Nút đăng nhập */}
        <button className="w-full bg-green-900 text-white py-3 rounded-md hover:bg-green-800 transition" onClick={handleLogin}>
          Đăng nhập
        </button>

        {/* Link Đăng ký và Quên mật khẩu */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <NavLink to="/register" className="text-green-900 font-bold hover:underline">ĐĂNG KÝ NGAY</NavLink>
          <NavLink to="/forgot-password" className="text-gray-600 hover:underline">Quên mật khẩu?</NavLink>
        </div>
      </div>
    </div>
  );
}
export default Login