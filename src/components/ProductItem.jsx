import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, name, price, image }) => {
  const { currency, formatMoney, handleAddToCart } = useContext(ShopContext);

  return (
    <div className="rounded flex flex-col items-center justify-between text-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out w-full box-border p-5 shadow-lg sm:shadow-none">
      {/* Link chỉ bao quanh ảnh */}
      <Link to={`/product/${id}`}>
        <img className="rounded" src={image} alt={name} />
      </Link>
      <p className="pt-3 pb-1 text-sm">
        <Link to={`/product/${id}`}>{name}</Link>
      </p>
      <p className="text-sm font-medium mt-1">
        <Link to={`/product/${id}`}>
          {formatMoney(price)} {currency}
        </Link>
      </p>
      <button
        onClick={() => {
          handleAddToCart(Number(id));
        }}
        className="text-xs sm:text-sm flex items-center gap-3 justify-center mt-3 border border-[#005E4F] text-[#005E4F] rounded py-2 px-4 hover:text-white hover:bg-[#005E4F] transition-all duration-300"
      >
        <i className="fa-solid fa-cart-shopping"></i>
        <span>Thêm giỏ hàng</span>
      </button>
    </div>
  );
};
export default ProductItem;
//
