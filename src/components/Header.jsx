import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
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
  const { authUser } = useAuth();
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
          <div className="group relative flex flex-col items-center ">
            <p className="flex gap-2">
              SẢN PHẨM <span>&#128899;</span>
            </p>
            <hr className="w-1/2 border-none h-[1.5px] bg-gray-700 hidden" />
            <div className="group-hover:block hidden absolute dropdown-menu top-[15px] left-0 pt-4">
              <div className="flex flex-col gap-2 w-40 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-white hover:bg-gray-600 py-2 px-6">
                  Bút viết
                </p>
                <p className="cursor-pointer hover:text-white hover:bg-gray-600 py-2 px-6">
                  Sách vở
                </p>
                <p className="cursor-pointer hover:text-white hover:bg-gray-600 py-2 px-6">
                  Đèn học
                </p>
                <p className="cursor-pointer hover:text-white hover:bg-gray-600 py-2 px-6">
                  Văn phòng phẩm
                </p>
                <p className="cursor-pointer hover:text-white hover:bg-gray-600 py-2 px-6">
                  Giấy in
                </p>
              </div>
            </div>
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
        {authUser() ? (
          <img
            src={images.avatar}
            alt="profile_avatar"
            className="w-10 cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        ) : (
          <img
            src={images.profile_icon}
            alt="profile_icon"
            className="w-5 cursor-pointer"
            onClick={() => navigate("/login")}
          />
        )}
        <Link to="/cart" className="relative inline-block">
          <div className="relative">
            <img
              src={images.cart_icon}
              className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-110"
              alt="cart_icon"
            />
            <p className="absolute -right-2 -top-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold shadow-md">
              {getCartTotalQuantity()}
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

