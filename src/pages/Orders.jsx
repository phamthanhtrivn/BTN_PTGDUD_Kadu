import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function Orders() {
  const { token, currency, formatMoney, navigate } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post("http://localhost:3001/order/list", {}, {headers: {token}})
      if (response.data.success) {
        setOrderData(response.data.orders.reverse());
        
        
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  console.log(orderData);
  

  useEffect(() => {
    loadOrderData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return  (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Các Đơn Hàng Của Tôi</h2>
      {orderData.length > 0 ? (
        orderData.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-lg mb-6 p-4 shadow-sm"
          >
            {/* Ngày đặt hàng và tổng tiền */}
            <div className="flex sm:justify-between sm:flex-row gap-5 mb-4 flex-col">
              <div>
                <p className="text-base">
                  Ngày đặt hàng:{" "}
                  <span className="font-medium">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-base">
                  Tổng tiền:{" "}
                  <span className="font-medium text-base">
                    {formatMoney(order.amount)} {currency}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm">Địa chỉ giao hàng:</p>
                <p className="font-medium">
                  {`${order.address.street}, ${order.address.ward}, ${order.address.district}, ${order.address.city}`}
                </p>
              </div>
            </div>

            {order.items.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row gap-4 border-t py-4 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Hình ảnh */}
                <img
                  className="w-20 h-20 object-cover rounded"
                  src={product.image}
                  alt={product.name}
                />
                {/* Thông tin sản phẩm */}
                <div className="flex-1 text-gray-600">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm">
                    {formatMoney(product.price)} {currency} x {product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-gray-500">Không có đơn hàng nào.</p>
      )}
    </div>
  );
}

export default Orders;
