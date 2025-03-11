import { Link } from "react-router-dom";

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
          <button className="w-1/2 bg-green-800 text-white py-2 rounded-md hover:bg-green-700 transition">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
