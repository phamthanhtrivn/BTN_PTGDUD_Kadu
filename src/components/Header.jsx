import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { images } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  const {
    setVisibleMenu,
    navigate,
    setShowSearchBar,
    showSearchBar,
    getCartTotalQuantity,
  } = useContext(ShopContext);
  const { authUser } = useAuth();

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center justify-between mb-10 py-6 font-medium border-b border-gray-300 shadow-sm">
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
          <div className="group relative flex flex-col items-center">
            <p className="flex items-center gap-2">
              SẢN PHẨM{" "}
              <FaChevronDown className="text-xs group-hover:rotate-180 transition-transform duration-300" />
            </p>
            <hr className="w-1/2 border-none h-[2px] bg-[#005E4F] hidden transition-all duration-300" />
            <div className="group-hover:block hidden absolute dropdown-menu top-full left-0 mt-2 -ml-8">
              <div className="flex flex-col gap-1 w-48 bg-white shadow-lg text-gray-700 rounded-xl border border-gray-100 py-4 px-2 transform transition-all duration-200 ease-in-out hover:block">
                <p className="cursor-pointer hover:text-white hover:bg-[#005E4F] py-2 px-4 rounded-lg transition-colors duration-200">
                  Bút viết
                </p>
                <p className="cursor-pointer hover:text-white hover:bg-[#005E4F] py-2 px-4 rounded-lg transition-colors duration-200">
                  Sách vở
                </p>
                <p className="cursor-pointer hover:text-white hover:bg-[#005E4F] py-2 px-4 rounded-lg transition-colors duration-200">
                  Đèn học
                </p>
                <p className="cursor-pointer hover:text-white hover:bg-[#005E4F] py-2 px-4 rounded-lg transition-colors duration-200">
                  Văn phòng phẩm
                </p>
                <p className="cursor-pointer hover:text-white hover:bg-[#005E4F] py-2 px-4 rounded-lg transition-colors duration-200">
                  Giấy in
                </p>
              </div>
            </div>
          </div>
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
        {authUser() ? (
          <img
            src={images.avatar}
            alt="profile_avatar"
            className="w-11 cursor-pointer rounded-full hover:ring-2 hover:ring-[#005E4F] transition-all duration-300"
            onClick={() => navigate("/profile")}
          />
        ) : (
          <img
            src={images.profile_icon}
            alt="profile_icon"
            className="w-6 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() => navigate("/login")}
          />
        )}
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