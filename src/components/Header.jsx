import { NavLink, Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { images } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const {
    setVisibleMenu,
    navigate,
    setShowSearchBar,
    showSearchBar,
    getCartTotalQuantity,
  } = useContext(ShopContext);
  const { authUser, logOut } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center justify-between py-6 font-medium border-b border-gray-300 shadow-sm w-full px-4 sm:px-8">
      <Link to="/">
        <img src={images.logo} className="w-40" alt="logo" />
      </Link>
      <ul className="hidden sm:flex gap-8 text-base text-gray-800">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 hover:text-[#005E4F] transition-all duration-300 ease-in-out ${
              isActive ? "text-[#005E4F] active" : ""
            }`
          }
        >
          <p>TRANG CHỦ</p>
          <hr className="w-1/2 border-none h-[2px] bg-[#005E4F] hidden transition-all duration-300" />
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 hover:text-[#005E4F] transition-all duration-300 ease-in-out ${
              isActive ? "text-[#005E4F] active" : ""
            }`
          }
        >
          <p>SẢN PHẨM</p>
          <hr className="w-1/2 border-none h-[2px] bg-[#005E4F] hidden transition-all duration-300" />
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 hover:text-[#005E4F] transition-all duration-300 ease-in-out ${
              isActive ? "text-[#005E4F] active" : ""
            }`
          }
        >
          <p>VỀ CHÚNG TÔI</p>
          <hr className="w-1/2 border-none h-[2px] bg-[#005E4F] hidden transition-all duration-300" />
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 hover:text-[#005E4F] transition-all duration-300 ease-in-out ${
              isActive ? "text-[#005E4F] active" : ""
            }`
          }
        >
          <p>LIÊN HỆ</p>
          <hr className="w-1/2 border-none h-[2px] bg-[#005E4F] hidden transition-all duration-300" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-7">
        <img
          src={images.search_icon}
          alt="search_icon"
          className="w-6 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          onClick={() => setShowSearchBar(!showSearchBar)}
        />
        <div className="relative" ref={dropdownRef}>
          {authUser() ? (
            <img
              src={images.avatar}
              alt="profile_avatar"
              className="w-11 cursor-pointer rounded-full hover:ring-2 hover:ring-[#005E4F] transition-all duration-300"
              onClick={() => setShowDropdown(!showDropdown)}
            />
          ) : (
            <img
              src={images.profile_icon}
              alt="profile_icon"
              className="w-6 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() => navigate("/login")}
            />
          )}
          {authUser() && showDropdown && (
            <div className="text-base absolute right-0 w-48 bg-slate-100 text-gray-500 shadow-md rounded py-2 mt-2">
              <p
                onClick={() => navigate("/user")}
                className="p-2 cursor-pointer hover:text-black hover:bg-gray-200 transition-colors duration-200"
              >
                Thông tin của tôi
              </p>
              <p
                onClick={() => navigate("/orders")}
                className="p-2 cursor-pointer hover:text-black hover:bg-gray-200 transition-colors duration-200"
              >
                Các đơn hàng của tôi
              </p>
              <p
                onClick={() => logOut()}
                className="p-2 cursor-pointer hover:text-black hover:bg-gray-200 transition-colors duration-200"
              >
                Đăng xuất
              </p>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative inline-block">
          <div className="relative">
            <img
              src={images.cart_icon}
              className="w-7 h-7 transition-transform duration-300 ease-in-out hover:scale-110"
              alt="cart_icon"
            />
            <p className="absolute -right-2 -top-2 flex items-center justify-center w-5 h-5 bg-[#005E4F] text-white rounded-full text-xs font-bold shadow-md">
              {getCartTotalQuantity()}
            </p>
          </div>
        </Link>
        <img
          onClick={() => setVisibleMenu(true)}
          src={images.menu_icon}
          className="w-6 cursor-pointer sm:hidden hover:opacity-80 transition-opacity duration-200"
          alt="menu_icon"
        />
      </div>
    </div>
  );
};

export default Header;