import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useRef, use } from "react";
import React from "react";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
const ForgotPassword = () => {
  const inputEmail = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/auth/forgot-password", { email: inputEmail.current.value });
      toast.success(`✅ ${res.data.message}`);
    } catch (err) {
      // Lấy message từ response của server
      const errorMessage = err.response?.data?.message || "❌ Đã xảy ra lỗi!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 rounded-2xl">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">QUÊN MẬT KHẨU</h2>

        {/* Thông báo */}
        <div className="border rounded-lg p-4 flex items-start bg-green-100 border-green-300 text-green-800 mb-4">
          <div className="mr-3">
            <span className="text-3xl">📩</span>
          </div>
          <div>
            <p className="font-semibold">Khôi phục mật khẩu qua email</p>
            <p className="text-sm">
              Mã sẽ gửi qua email bạn đăng ký để thay đổi mật khẩu
            </p>
          </div>
          <div className="ml-auto text-lg cursor-pointer">⚙️</div>
        </div>

        {/* Nhập Email */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            Email *
          </label>
          <input
            ref={inputEmail}
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Nhập email của bạn"
          />
        </div>

        {/* Nút xác nhận */}
        <div className="flex gap-4">
          <Link to="/login" className="text-center w-1/2 hover:bg-green-800 hover:text-white py-2 rounded-md border border-green-800 text-green-800 transition duration-300">
            Quay lại
          </Link>
          <button onClick={handleForgotPassword} disabled={isLoading} className="w-1/2 flex justify-center items-center bg-green-800 text-white py-2 rounded-md hover:bg-green-700 transition">
            {isLoading ? <FaSpinner className="animate-spin" /> : " Xác nhận"}
          </button>

        </div>
      </div>
    </div>
  );
};

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleResetPassword = async () => {

    if (!token) {
      toast.error("❌ Token không hợp lệ!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("❌ Mật khẩu xác nhận không khớp!");
      return;
    }
    setIsLoading(true); // 🔄 Bắt đầu loading
    try {
      const res = await axios.post("http://localhost:3001/auth/reset-password", { token, newPassword });
      toast.success(`✅ ${res.data.message}`);
    } catch (err) {
      // Lấy message từ response của server
      const errorMessage = err.response?.data?.message || "❌ Đã xảy ra lỗi!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // ✅ Kết thúc loading
      navigate("/login");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center">🔒 Đặt lại mật khẩu</h2>

        <label className="text-sm font-medium">Mật khẩu mới</label>
        <input
          type="password"
          className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <label className="text-sm font-medium">Xác nhận mật khẩu</label>
        <input
          type="password"
          className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Xác nhận mật khẩu mới"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          style={{ backgroundColor: "#005F53" }}
          onClick={handleResetPassword}
          disabled={isLoading}
          className="text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-green-700 disabled:bg-gray-400"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Đặt lại mật khẩu"}
        </button>
      </div>
    </div>
  );
};
export { ResetPassword };
export default ForgotPassword;

