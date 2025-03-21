import { Link } from "react-router-dom";
import { images } from "../assets/assets";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  // Hàm để cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà
    });
  };

  return (
    <div className="bg-[#005E4F] text-white text-sm">
      {/* Nội dung chính của Footer */}
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-6 p-6 sm:p-8">
        {/* Phần Thông Tin Liên Hệ với Logo */}
        <div>
          <img src={images.logo_footer} alt="logo" className="mb-4 w-28" />
          <p className="text-lg font-medium mb-4">THÔNG TIN LIÊN HỆ</p>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <span className="text-base">📍</span>
              <span className="text-gray-200">12 Nguyễn Văn Bảo, Gò Vấp, Tp.HCM, Việt Nam</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-base">✉️</span>
              <span className="text-gray-200">kadu@sitename.com</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-base">📞</span>
              <span className="text-gray-200">+1900 78 78 98</span>
            </li>
          </ul>
          {/* Biểu tượng Mạng Xã Hội */}
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="bg-white text-[#005E4F] p-2 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-110"
            >
              <FaFacebookF className="text-base" />
            </a>
            <a
              href="#"
              className="bg-white text-[#005E4F] p-2 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-110"
            >
              <FaTwitter className="text-base" />
            </a>
            <a
              href="#"
              className="bg-white text-[#005E4F] p-2 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-110"
            >
              <FaGooglePlusG className="text-base" />
            </a>
            <a
              href="#"
              className="bg-white text-[#005E4F] p-2 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-110"
            >
              <FaYoutube className="text-base" />
            </a>
            <a
              href="#"
              className="bg-white text-[#005E4F] p-2 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-110"
            >
              <FaInstagram className="text-base" />
            </a>
          </div>
        </div>

        {/* Phần Liên Kết Hữu Ích (CÔNG TY) */}
        <div>
          <p className="text-lg font-medium mb-4">CÔNG TY</p>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/" className="text-gray-200 hover:text-white transition">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-200 hover:text-white transition">
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-200 hover:text-white transition">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-200 hover:text-white transition">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Phần Tài Khoản Của Tôi (CHĂM SÓC KHÁCH HÀNG) */}
        <div>
          <p className="text-lg font-medium mb-4">CHĂM SÓC KHÁCH HÀNG</p>
          <ul className="flex flex-col gap-2">
            <li className="text-gray-200 hover:text-white transition cursor-pointer">
              Chính sách kiểm hàng
            </li>
            <li className="text-gray-200 hover:text-white transition cursor-pointer">
              Chính sách đổi trả
            </li>
            <li className="text-gray-200 hover:text-white transition cursor-pointer">
              Bảo mật thông tin
            </li>
            <li className="text-gray-200 hover:text-white transition cursor-pointer">
              Thanh toán - Giao hàng
            </li>
          </ul>
        </div>

        {/* Phần Đăng Ký Nhận Tin */}
        <div>
          <p className="text-lg font-medium mb-4">TÀI KHOẢN CỦA TÔI</p>
          <p className="mb-3 text-gray-200">
            Nếu bạn muốn nhận email từ chúng tôi mỗi khi có ưu đãi đặc biệt mới,
            hãy đăng ký tại đây!
          </p>
          <div className="flex items-center bg-white text-black rounded-full p-1 shadow-md">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 outline-none px-3 text-sm text-black bg-transparent"
            />
            <button className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition">
              <span className="text-base">✉️</span> {/* Placeholder cho biểu tượng phong bì */}
            </button>
          </div>
        </div>
      </div>
      {/* Thanh Dưới cùng với Bản Quyền và Phương Thức Thanh Toán */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 sm:px-8 border-t border-gray-300">
        <p className="text-sm text-gray-200">
          Copyright 2025@iuh.edu.com - Mọi Quyền Được Bảo Lưu.
        </p>
        <div className="flex gap-2 mt-2 sm:mt-0">
          {/* Biểu tượng Phương Thức Thanh Toán */}
          <img
            src="https://shop-interior.vercel.app/assets/images/ImagesFigma/img1.png"
            alt="Visa"
            className="h-7 rounded-md border border-gray-300 hover:opacity-80 transition"
          />
          <img
            src="https://shop-interior.vercel.app/assets/images/ImagesFigma/img2.png"
            alt="Discover"
            className="h-7 rounded-md border border-gray-300 hover:opacity-80 transition"
          />
          <img
            src="https://shop-interior.vercel.app/assets/images/ImagesFigma/img3.png"
            alt="MasterCard"
            className="h-7 rounded-md border border-gray-300 hover:opacity-80 transition"
          />
          <img
            src="https://shop-interior.vercel.app/assets/images/ImagesFigma/img4.png"
            alt="PayPal"
            className="h-7 rounded-md border border-gray-300 hover:opacity-80 transition"
          />
          <img
            src="https://shop-interior.vercel.app/assets/images/ImagesFigma/img5.png"
            alt="American Express"
            className="h-7 rounded-md border border-gray-300 hover:opacity-80 transition"
          />
        </div>
      </div>

      {/* Nút Quay Lại Đầu Trang */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-[#005E4F] p-4 rounded-full text-white hover:bg-orange-600 transition-transform transform hover:scale-110"
      >
        ↑
      </button>
    </div>
  );
};

export default Footer;