// THIS IS USE IN APP.jsx
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { images } from "../assets/assets";
import Swal from "sweetalert2";
import axios from "axios";

function Cart() {
  const {
    currency,
    cartData,
    setCartItems,
    navigate,
    formatMoney,
    delivery_fee,
    handleUpdateQuantityCart,
    handleDeleteCartItem,
    token,
  } = useContext(ShopContext);

  const [total, setTotal] = useState(0);

  const cartTotal = () => {
    const total = cartData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(total);
  };

  useEffect(() => {
    cartTotal();
  }, [cartData]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có muốn xóa sản phẩm này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#ccc",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteCartItem(id);
        Swal.fire({
          title: "Đã xóa sản phẩm!",
          icon: "success",
        });
      }
    });
  };

  const handleDeleteAll = () => {
    Swal.fire({
      title: "Bạn có muốn xóa tất cả sản phẩm không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#ccc",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setCartItems([]);
        await axios.post(
          "http://localhost:3001/cart/delete-all",
          {},
          { headers: { token: token } }
        );
        Swal.fire({
          title: "Đã xóa tất cả sản phẩm!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="px-20 py-10 ">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-5">
        <h1 className="text-2xl font-medium">Giỏ hàng</h1>
        {cartData.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="w-[150px] px-4.5 py-2 hover:bg-red-600 hover:text-white rounded border border-red-600 bg-white text-red-600 transition-all duration-300"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      <div className="mt-5">
        {cartData.length > 0 ? (
          cartData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-gray-300 border-t border-b text-gray-700 grid grid-cols-[3fr_1fr_1fr_0.5fr] items-center gap-4"
            >
              <div
                onClick={() => navigate(`/product/${item.id}`)}
                className="flex items-start gap-6 cursor-pointer"
              >
                <img className="w-16 sm:w-20" src={item.image} alt="image" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                  <p className="mt-5">
                    {formatMoney(item.price)} {currency}
                  </p>
                </div>
              </div>
              <input
                type="number"
                min={1}
                value={item.quantity}
                className="border border-gray-300 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                onChange={(e) =>
                  handleUpdateQuantityCart(item.id, Number(e.target.value))
                }
              />
              <p>
                {formatMoney(item.price * item.quantity)} {currency}
              </p>
              <i
                className="fa-solid fa-trash-can cursor-pointer text-red-600"
                onClick={() => handleDelete(item.id)}
              ></i>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center text-2xl font-medium text-center">
            <img src={images.empty_cart} alt="empty_cart" />
            <p className="mt-10">GIỎ HÀNG CỦA BẠN CÒN TRỐNG</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#005E4F] text-white text-sm px-8 py-3 mt-10 cursor-pointer rounded-xl border border-[#005E4F] hover:text-[#005E4F] hover:bg-white transition-all duration-300"
            >
              MUA NGAY
            </button>
          </div>
        )}
      </div>

      {cartData.length > 0 && (
        <div className="flex justify-end my-10">
          <div className="w-full sm:w-[450px]">
            <div className="flex flex-col justify-end items-start">
              <div className="w-full">
                <div className="text-2xl font-bold mt-10">
                  <p>Tổng Tiền</p>
                </div>
                <div className="flex flex-col gap-2 mt-5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <p>Thành Tiền</p>
                    <p>
                      {formatMoney(total)} {currency}
                    </p>
                  </div>
                  <hr className="text-gray-300" />
                  <div className="flex justify-between">
                    <p>Phí vận chuyển</p>
                    <p>
                      {formatMoney(delivery_fee)} {currency}
                    </p>
                  </div>
                  <hr className="text-gray-300" />
                  <div className="text-end text-xl sm:text-2xl mt-5">
                    <b>
                      {total === 0 ? 0 : formatMoney(total + delivery_fee)}{" "}
                      {currency}
                    </b>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-full sm:w-[250px]">
                <div className="w-full text-end">
                  <button
                    onClick={() => navigate("/place-order")}
                    className="font-medium bg-[#005E4F] text-white text-sm my-8 px-8 py-3 cursor-pointer border border-[#005E4F] hover:text-[#005E4F] hover:bg-white transition-all duration-300 rounded"
                  >
                    THANH TOÁN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
