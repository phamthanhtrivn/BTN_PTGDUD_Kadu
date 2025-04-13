import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import "../styles/ProductItem.css";

const FlashSale = () => {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: Math.floor(Math.random() * 3),
    minutes: Math.floor(Math.random() * 30) + 30,
    seconds: Math.floor(Math.random() * 60),
  });

  // 🛒 Gọi API lấy danh sách sản phẩm Flash Sale
  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        const response = await fetch(
          "https://67d0f9e5825945773eb281b6.mockapi.io/products_sale"
        );
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu Flash Sale");
        }
        const data = await response.json();
        setFlashSaleProducts(data);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    fetchFlashSaleProducts();
  }, []);

  // ⏳ Đếm ngược thời gian Flash Sale
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds -= 1;
        } else {
          if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
          } else if (hours > 0) {
            hours -= 1;
            minutes = 59;
            seconds = 59;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-custom-green p-6 rounded-2xl shadow-lg mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-yellow-200 flex items-center">
          🔥 FLASH SALE - GIẢM GIÁ CỰC SỐC
        </h2>
        <div className="text-yellow-200 text-xl font-semibold">
          ⏳ {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
        {flashSaleProducts.length > 0 ? (
          flashSaleProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">
            Không có sản phẩm Flash Sale nào!
          </p>
        )}
      </div>
    </div>
  );
};
export default FlashSale;
//
