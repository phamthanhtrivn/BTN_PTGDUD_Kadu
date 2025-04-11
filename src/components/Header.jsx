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

  const { logOut } = useAuth();
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

  const navLinkClass = ({ isActive }) =>
    `text-[15px] ${
      isActive ? "text-[#005E4F]" : "text-black"
    } hover:text-[#005E4F] hover:font-semibold transition-all duration-200`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <img src={images.logo} alt="Logo" className="w-36" />
      </Link>

      {/* Navigation */}
      <nav className="hidden sm:flex gap-8 text-base uppercase font-semibold text-black">
        <NavLink to="/" className={navLinkClass}>
          Trang chủ
        </NavLink>
        <NavLink to="/products" className={navLinkClass}>
          Sản phẩm
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          Về chúng tôi
        </NavLink>
        <NavLink to="/contact" className={navLinkClass}>
          Liên hệ
        </NavLink>
      </nav>

      {/* Icons + Dropdown */}
      <div className="flex items-center gap-5">
        {/* Search Icon */}
        <img
          src={images.search_icon}
          alt="Tìm kiếm"
          className="w-5 cursor-pointer"
          onClick={() => setShowSearchBar(!showSearchBar)}
        />

        {/* User/Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <img
            src={token ? images.user : images.profile_icon}
            alt="profile"
            className={`cursor-pointer ${token ? "w-9" : "w-6"}`}
            onClick={() =>
              token ? setShowDropdown(!showDropdown) : navigate("/login")
            }
          />
          {token && showDropdown && (
            <div className="absolute right-0 w-48 bg-white border rounded shadow-md mt-2 text-base">
              <p
                onClick={() => navigate("/user")}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                Thông tin của tôi
              </p>
              <p
                onClick={() => navigate("/orders")}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                Đơn hàng
              </p>
              <p
                onClick={logOut}
                className="p-3 hover:bg-gray-100 cursor-pointer text-red-500"
              >
                Đăng xuất
              </p>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img
            src={images.cart_icon}
            alt="Giỏ hàng"
            className="w-6 hover:scale-110 transition-transform"
          />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
            {totalQuantity}
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisibleMenu(true)}
          src={images.menu_icon}
          className="w-6 sm:hidden cursor-pointer"
          alt="menu"
        />
      </div>
    </header>
  );
};

export default Header;
