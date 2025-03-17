import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import React from "react";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!checkValidInput()) {
      return;
    }
    const info = {
      username: inputName.current.value,
      password: inputPassword.current.value,
      email: inputEmail.current.value,
      phone: inputPhone.current.value,
    };
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message);
        aLogin.current.click(); // Chuyển hướng sang trang login
        navigate("/login");
      } else {
        toast.error(data.message); // Thông báo lỗi từ server
      }

    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };
  const checkValidInput = () => {
    let returnVal = true;
    const lengthRegex = new RegExp("^.{4,}$");
    if (inputName.current.value === "" ||
      inputPassword.current.value === "" ||
      inputConfirmPassword.current.value === "" ||
      inputEmail.current.value === "" ||
      inputPhone.current.value === "") {
      toast.error("Vui lòng điền đầy đủ thông tin");
      returnVal = false;
    }
    else if (inputPassword.current.value !== inputConfirmPassword.current.value) {
      toast.error("Mật khẩu không khớp");
      returnVal = false;
    }
    else if (!lengthRegex.test(inputPassword.current.value) || !lengthRegex.test(inputName.current.value)) {
      toast.error("Mật khẩu và UserName phải có ít nhất 4 ký tự");
      returnVal = false;
    }
    else if (inputPhone.current.value.length !== 10 || new RegExp("^[0-9]{10}$").test(inputPhone.current.value) === false) {
      toast.error("Số điện thoại phải có 10 số");
      returnVal = false;
    }
    else if (new RegExp("^[a-zA-Z0-9._%+-]+@gmail\.com$").test(inputEmail.current.value) === false) {
      toast.error("Email phải có dạng @gmail.com");
      returnVal = false;
    }
    return returnVal;

  }
  const inputName = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();
  const inputEmail = useRef();
  const inputPhone = useRef();
  const aLogin = useRef();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 rounded-2xl">
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

