import { Link } from "react-router-dom";
import { images } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#003D34] text-white mt-16 rounded-t-3xl pt-12 px-8 pb-4">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-10 text-sm">
        <div>
          <img
            src={images.logo_footer}
            alt="Logo Footer"
            className="w-32 mb-5"
          />
          <p className="text-gray-300 leading-relaxed">
            Chúng tôi cung cấp các sản phẩm chất lượng cao cùng với dịch vụ chăm
            sóc khách hàng tận tình. Sự hài lòng của bạn là ưu tiên hàng đầu của
            chúng tôi.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Công ty</h4>
          <ul className="flex flex-col gap-2 text-gray-300">
            <Link to="/" className="hover:text-white">
              Trang chủ
            </Link>
            <Link to="/products" className="hover:text-white">
              Sản phẩm
            </Link>
            <Link to="/about" className="hover:text-white">
              Về chúng tôi
            </Link>
            <Link to="/contact" className="hover:text-white">
              Liên hệ
            </Link>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h4>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li className="hover:text-white">Chính sách kiểm hàng</li>
            <li className="hover:text-white">Chính sách đổi trả</li>
            <li className="hover:text-white">Bảo mật thông tin</li>
            <li className="hover:text-white">Thanh toán & giao hàng</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm text-gray-400">
        © 2025 iuh.edu.vn - All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
