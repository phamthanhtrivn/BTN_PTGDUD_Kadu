/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
const PlaceOrder = () => {
  const {
    products,
    currency,
    cartItems,
    navigate,
    formatMoney,
    delivery_fee,
    getCartTotalQuantity,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);

  const cartTotal = () => {
    let total = 0;
    if (cartData.length > 0) {
      total = cartData.reduce((arr, curr) => {
        return arr + curr.price * curr.quantity;
      }, 0);
    }
    setTotal(total);
  };

  const renderCart = () => {
    let carts = [];
    if (cartItems.length > 0) {
      cartItems.map((item) => {
        const product = products.find((product) => product.id === item.id);
        carts.push({ ...product, quantity: item.quantity });
        return item;
      });
    }
    setCartData(carts);
  };

  useEffect(() => {
    renderCart();
  }, []);

  useEffect(() => {
    cartTotal();
  }, [cartData]);

  return (
    <form className="flex flex-col md:flex-row justify-between items-start gap-10">
      <div className="w-full flex flex-col gap-4 lg:w-1/3">
        <div className="text-xl sm:text-2xl mb-1">
          <p>Thông tin nhận hàng</p>
        </div>
        <input
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Họ và tên..."
          name="lastName"
        />
        <input
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email..."
          name="email"
        />
        <input
          required
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Số điện thoại..."
          name="phone"
        />
        <div className="flex gap-3 ">
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Tỉnh thành..."
            name="city"
          />
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Quận huyện..."
            name="district"
          />
        </div>
        <div className="flex gap-3 ">
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Phường xã"
            name="ward"
          />
          <input
            required
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Số địa chỉ..."
            name="street"
          />
        </div>
      </div>

      

      <div className="w-full flex flex-col justify-center gap-5 lg:w-1/3">
        <div className="text-xl sm:text-2xl">
          <p>Đơn hàng ({getCartTotalQuantity()} sản phẩm) </p>
        </div>
        <div>
          {cartData.map((item, index) => (
            <div
              key={index}
              className="py-2 border-gray-300 border-t border-b text-gray-700 grid grid-cols-[3fr_1fr] items-center gap-4 text-xs sm:text-sm "
            >
              <div
                onClick={() => navigate(`/product/${item.id}`)}
                className="flex items-start gap-6 cursor-pointer"
              >
                <img className="w-16 sm:w-20" src={item.image} alt="image" />
                <div>
                  <p>{item.name}</p>
                  <p className="mt-3">
                    {" "}
                    Số lượng: {formatMoney(item.quantity)}{" "}
                  </p>
                </div>
              </div>

              <p>
                {formatMoney(item.price * item.quantity)} {currency}{" "}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/3">
        <div>
          <div className="text-xl sm:text-2xl">
            <p>Thanh Toán</p>
          </div>
          <div className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer max-w-[250px] mt-5">
            <p className="min-w-3.5 h-3.5 border border-gray-300 rounded-full bg-[#005E4F]"></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              Thanh toán khi giao hàng
            </p>
          </div>
        </div>
        <div>
          <div>
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
          <div className="flex justify-end">
            <div className="w-full sm:w-[250px]">
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/orders")}
                  className="font-medium bg-[#005E4F] text-white text-sm my-8 px-8 py-3 cursor-pointer border border-[#005E4F] hover:text-[#005E4F] hover:bg-white transition-all duration-300 rounded"
                >
                  ĐẶT HÀNG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
