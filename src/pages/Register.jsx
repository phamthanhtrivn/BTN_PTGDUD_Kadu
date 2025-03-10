import { Link, NavLink } from "react-router-dom";
import { use, useState, useRef } from "react";
const Register = () => {
      const [info, setInfo] = useState({
            username: "",
            password: "",
            email: "",
            phone: "",
      });
      const handleRegister = (e) => {
            if (inputPassword.current.value !== inputConfirmPassword.current.value) {
                  alert("Mật khẩu không khớp");
                  return;
            }
            if (inputName.current.value === "" || inputPassword.current.value === "" || inputConfirmPassword.current.value === "" || inputEmail.current.value === "" || inputPhone.current.value === "") {
                  alert("Vui lòng nhập đầy đủ thông tin");
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
      }
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
                              <input ref={inputName} type="text" placeholder="Họ và tên *" className="border p-2 rounded w-full" />
                              <input ref={inputPassword} type="password" placeholder="Mật khẩu *" className="border p-2 rounded w-full" />
                              <input ref={inputConfirmPassword} type="password" placeholder="Xác nhận mật khẩu *" className="border p-2 rounded w-full" />
                              <input ref={inputEmail} type="email" placeholder="Email *" className="border p-2 rounded w-full" />
                              <input ref={inputPhone} type="text" placeholder="Số điện thoại *" className="border p-2 rounded w-full" />
                              <div className="col-span-1 sm:col-span-2">
                                    <button className="w-full bg-green-800 text-white p-3 rounded" onClick={() => handleRegister(e)}>Đăng ký</button>
                              </div>
                        </form>
                        <p className="text-center mt-4">
                              Bạn đã có tài khoản? <a ref={aLogin} href="/login" className="font-bold">Đăng nhập</a>
                        </p>
                  </div>
            </div>
      );
}
const ForgotPassword = () => {
      return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-center mb-4">QUÊN MẬT KHẨU</h2>

                        {/* Thông báo */}
                        <div className="border rounded-lg p-4 flex items-start bg-green-100 border-green-300 text-green-800 mb-4">
                              <div className="mr-3">
                                    <span className="text-3xl">📩</span>
                              </div>
                              <div>
                                    <p className="font-semibold">Khôi phục mật khẩu qua email</p>
                                    <p className="text-sm">Mã sẽ gửi qua email bạn đăng ký để thay đổi mật khẩu</p>
                              </div>
                              <div className="ml-auto text-lg cursor-pointer">⚙️</div>
                        </div>

                        {/* Nhập Email */}
                        <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email *</label>
                              <input
                                    id="email"
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Nhập email của bạn"
                              />
                        </div>

                        {/* Nút xác nhận */}
                        <button className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-700 transition">
                              Xác nhận
                        </button>
                  </div>
            </div>
      );
}
export { Register, ForgotPassword };