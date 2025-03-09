import { Link } from "react-router-dom"
import { images } from "../assets/assets"

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-10 p-10 text-sm bg-gray-700 text-white">
        <div>
          <img src={images.logo} alt="logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga libero
            nulla quos provident tenetur? Aut pariatur possimus itaque nostrum
            sequi facere quia, accusantium voluptas tempora distinctio,
            similique animi dolorem necessitatibus!
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">CÔNG TY</p>
          <ul className="flex flex-col gap-1">
            <Link to="/">Trang chủ</Link>
            <Link to="/products">Sản phẩm</Link>
            <Link to="/about">Về chúng tôi</Link>
            <Link to="/contact">Liên hệ</Link>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">CHĂM SÓC KHÁCH HÀNG</p>
          <ul className="flex flex-col gap-1">
            <li>Chính sách kiểm hàng</li>
            <li>Chính sách đổi trả</li>
            <li>Bảo mật thông tin</li>
            <li>Thanh toán - Giao hàng</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className="text-gray-300" />
        <p className="py-5 text-sm text-center">
          Copyright 2025@iuh.edu.com - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer