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
    totalQuantity,
    token,
  } = useContext(ShopContext);

  const { logOut } = useAuth()

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
    <div className="sticky top-0 z-50 bg-white flex items-center justify-between mb-10 py-5 font-medium border-b border-gray-400">
      <Link to="/">
        <img src={images.logo} className="w-36" alt="logo" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>TRANG CHỦ</p>
          <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/products" className="flex flex-col items-center gap-1">
          <div className="flex flex-col items-center ">
            <div className="flex gap-2">SẢN PHẨM</div>
            <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
          </div>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>VỀ CHÚNG TÔI</p>
          <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>LIÊN HỆ</p>
          <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={images.search_icon}
          alt="search_icon"
          className="w-5 cursor-pointer"
          onClick={() => setShowSearchBar(!showSearchBar)}
        />
        <div className="relative" ref={dropdownRef}>
          <img
            src={images.profile_icon}
            alt="profile_icon"
            className="w-5 cursor-pointer"
            onClick={() =>
              token ? setShowDropdown(!showDropdown) : navigate("/login")
            }
          />
          {token && showDropdown && (
            <div className="text-base absolute right-0 w-45 bg-slate-100 text-gray-500 shadow-md rounded py-2 mt-2">
              <p
                onClick={() => navigate("/user")}
                className="p-2 cursor-pointer hover:text-black"
              >
                Thông tin của tôi
              </p>
              <p
                onClick={() => navigate("/orders")}
                className="p-2 cursor-pointer hover:text-black"
              >
                Các đơn hàng của tôi
              </p>
              <p onClick={() => logOut()} className="p-2 cursor-pointer hover:text-black">Đăng xuất</p>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative inline-block">
          <div className="relative">
            <img
              src={images.cart_icon}
              className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-110"
              alt="cart_icon"
            />
            <p className="absolute -right-2 -top-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold shadow-md">
              {totalQuantity}
            </p>
          </div>
        </Link>
        <img
          onClick={() => setVisibleMenu(true)}
          src={images.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu_icon"
        />
      </div>
    </div>
  );
};

export default Header;
