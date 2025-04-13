import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { images } from "../assets/assets";
import { NavLink } from "react-router-dom";

const SidebarMenu = () => {
  const { visibleMenu, setVisibleMenu } = useContext(ShopContext);

  return (
    <div
      className={`z-100 fixed top-0 right-[-10px] bottom-0 overflow-hidden bg-white transition-all duration-500 ${
        visibleMenu ? "w-screen h-screen" : "w-0"
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
        <NavLink
          className="py-2 pl-6 border-b border-gray-400 hover:font-semibold"
          to="/products"
          onClick={() => setVisibleMenu(false)}
        >
          Sản Phẩm
        </NavLink>
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
//
