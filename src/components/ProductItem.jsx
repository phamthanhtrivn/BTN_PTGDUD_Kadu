import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "../styles/ProductItem.css";
import { toast } from "react-toastify";

const ProductItem = ({ product }) => {
  console.log("Product prop in ProductItem:", product);

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>;
  }

  const { id, name, price, image, discount } = product;
  const { currency, formatMoney, handleAddToCart } = useContext(ShopContext);

  const priceNumber = parseInt(price?.toString().replace(/[^\d]/g, ""), 10) || 0;
  const discountNumber = parseInt(discount?.toString().replace(/[^\d]/g, ""), 10) || 0;

  const discountedPrice =
    discountNumber > 0
      ? priceNumber - Math.floor((priceNumber * discountNumber) / 100)
      : priceNumber;

  const handleAdd = () => {
    handleAddToCart(id); // Thêm sản phẩm vào giỏ
    toast.success(`${name} đã được thêm vào giỏ hàng!`, {
      position: "top-right", // Vị trí thông báo
      autoClose: 2000, // Tự động đóng sau 3 giây
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      style: { 
        background: "#d6ebd4", // Màu nền xanh nhạt
        color: "#41414", // Màu chữ xam
        borderRadius: "8px", // Bo góc nhẹ
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Bóng nhẹ
      },
    });
  };

  return (
    <div className="flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out w-full box-border p-5 shadow-lg sm:shadow-none rounded-lg bg-white">
      {/* Link bao quanh ảnh */}
      <Link to={`/product/${id}`} className="block">
        <div className="relative w-full h-40 flex justify-center items-center overflow-hidden bg-gray-100 rounded-lg">
          {discountNumber > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg">
              -{discountNumber}%
            </span>
          )}
          <img
            src={image}
            alt={name}
            className="max-w-full max-h-full object-cover"
          />
        </div>
      </Link>

      {/* Tên sản phẩm */}
      <p className="pt-3 pb-1 text-sm font-semibold">
        <Link to={`/product/${id}`}>{name}</Link>
      </p>

      {/* Hiển thị giá */}
      <div className="flex items-center justify-center space-x-2">
        {discountNumber > 0 ? (
          <>
            <p className="text-sm font-medium text-gray-500 line-through">
              {formatMoney(priceNumber)} {currency}
            </p>
            <p className="text-sm font-bold text-red-500">
              {formatMoney(discountedPrice)} {currency}
            </p>
          </>
        ) : (
          <p className="text-sm font-medium">
            {formatMoney(priceNumber)} {currency}
          </p>
        )}
      </div>

      {/* Nút "Thêm vào giỏ hàng" */}
      <div className="flex items-center w-full mt-3">
        <button
          onClick={handleAdd}
          className="flex-1 flex items-center gap-2 justify-center border border-[#005E4F] text-[#005E4F] rounded py-2 px-4 hover:text-white hover:bg-[#005E4F] transition-all duration-300"
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <span>Thêm giỏ hàng</span>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;