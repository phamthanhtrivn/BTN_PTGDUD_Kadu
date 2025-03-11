/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
const Register = () => {
  const [info, setInfo] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const handleRegister = (e) => {
    if (inputPassword.current.value !== inputConfirmPassword.current.value) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    if (
      inputName.current.value === "" ||
      inputPassword.current.value === "" ||
      inputConfirmPassword.current.value === "" ||
      inputEmail.current.value === "" ||
      inputPhone.current.value === ""
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    e.preventDefault();
    setInfo({
      username: inputName.current.value,
      password: inputPassword.current.value,
      email: inputEmail.current.value,
      phone: inputPhone.current.value,
    });
    aLogin.current.click();
  };
  const inputName = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();
  const inputEmail = useRef();
  const inputPhone = useRef();
  const aLogin = useRef();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">ĐĂNG KÝ</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            ref={inputName}
            type="text"
            placeholder="Họ và tên *"
            className="border p-2 rounded w-full"
          />
          <input
            ref={inputPassword}
            type="password"
            placeholder="Mật khẩu *"
            className="border p-2 rounded w-full"
          />
          <input
            ref={inputConfirmPassword}
            type="password"
            placeholder="Xác nhận mật khẩu *"
            className="border p-2 rounded w-full"
          />
          <input
            ref={inputEmail}
            type="email"
            placeholder="Email *"
            className="border p-2 rounded w-full"
          />
          <input
            ref={inputPhone}
            type="text"
            placeholder="Số điện thoại *"
            className="border p-2 rounded w-full"
          />
          <div className="col-span-1 sm:col-span-2">
            <button
              className="w-full bg-green-800 text-white p-3 rounded"
              onClick={(e) => handleRegister(e)}
            >
              Đăng ký
            </button>
          </div>
        </form>
        <p className="text-center mt-4">
          Bạn đã có tài khoản?{" "}
          <Link ref={aLogin} to="/login" className="font-bold">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
