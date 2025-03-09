import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { images } from "../assets/assets";
import { NavLink } from "react-router-dom";

const SidebarMenu = () => {
  const { visibleMenu, setVisibleMenu } = useContext(ShopContext);
  const [visibleCate, setVisibleCate] = useState(false);

  return (
    <div
      className={`z-100 absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-500 ${
        visibleMenu ? "w-full" : "w-0"
      }`}
    >
      <div className="flex flex-col">
        <div
          onClick={() => setVisibleMenu(false)}
          className="flex items-center gap-4 p-3 cursor-pointer"
        >
          <img
            src={images.dropdown_icon}
            className="h-4 rotate-180"
            alt="dropdown_icon"
          />
          <p>Trở về</p>
        </div>
        <NavLink
          onClick={() => setVisibleMenu(false)}
          className="py-2 pl-6 border-b border-gray-400 hover:font-semibold"
          to="/"
        >
          Trang Chủ
        </NavLink>
        <div className="flex items-center border-b border-gray-400">
          <NavLink className="py-2 pl-6 flex-1 hover:font-semibold" to="/products" onClick={() => setVisibleMenu(false)}>
            Sản Phẩm
          </NavLink>
          <div className="w-12 py-2 border-l text-center hover:cursor-pointer hover:font-semibold">
            {" "}
            <p onClick={() => setVisibleCate(!visibleCate)}>+</p>{" "}
          </div>
        </div>
        {visibleCate ? (
          <div className="text-gray-700">
            <p className="py-2 pl-10 border-b border-gray-400 hover:font-semibold">Bút viết</p>
            <p className="py-2 pl-10 border-b border-gray-400 hover:font-semibold">Sách vở</p>
            <p className="py-2 pl-10 border-b border-gray-400 hover:font-semibold">Đèn học</p>
            <p className="py-2 pl-10 border-b border-gray-400 hover:font-semibold">
              Văn phòng phẩm
            </p>
            <p className="py-2 pl-10 border-b border-gray-400 hover:font-semibold">Giấy in</p>
          </div>
        ) : null}
        <NavLink
          onClick={() => setVisibleMenu(false)}
          className="py-2 pl-6 border-b border-gray-400 hover:font-semibold"
          to="/about"
        >
          Về Chúng Tôi
        </NavLink>
        <NavLink
          onClick={() => setVisibleMenu(false)}
          className="py-2 pl-6 border-b border-gray-400 hover:font-semibold"
          to="/contact"
        >
          Liên Hệ
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarMenu;
