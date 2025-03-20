import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../utils/api.js";
import ProductItem from "../components/ProductItem";
import Banner from "../components/Banner";
import FlashSale from "../components/Flashsale";
import "../styles/CustomerReviews.css";
import CustomerReviews from "../components/CustomerReviews";
import NewsCarousel from "../components/NewsCarousel.jsx";
import CategorySection from "../components/ProductCategories.jsx";
import BusinessPartners from "../components/Partners.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import '../styles/ProductItem.css'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("new");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      console.log("Dữ liệu từ MockAPI:", data);
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categorizedProducts = {
    new: products.filter((p) => p.category === "new"),
    featured: products.filter((p) => p.category === "featured"),
    sale: products.filter((p) => p.category === "sale"),
  };

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const tabClasses = (tab) =>
    `px-4 py-2 cursor-pointer transition-all duration-300 ${
      activeTab === tab
        ? "text-[#005E4F] border-b-4 border-[#005E4F] font-bold"
        : "text-gray-600 hover:text-[#005E4F] hover:border-b-2 hover:border-gray-300"
    }`;

  if (loading) return <p className="text-center text-gray-500 py-10">Đang tải dữ liệu...</p>;
  if (!products.length) return <p className="text-center text-red-500 py-10">⚠ Không có sản phẩm nào!</p>;

  return (
    <div className="bg-gray-50">
      <Banner />
      <CategorySection />
      <br />

      {/* Phần hiển thị sản phẩm */}
      <section className="max-w-[1200px] mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Khám phá</h1>
          <p className="text-lg text-gray-600 mt-2">Gợi ý những sản phẩm phù hợp với bạn</p>
        </div>
        {/* Tabs */}
        <div className="flex justify-center gap-6 md:gap-12 border-b border-gray-200 mb-8">
          <button className={tabClasses("new")} onClick={() => handleTabChange("new")}>
            Sản phẩm mới
          </button>
          <button className={tabClasses("featured")} onClick={() => handleTabChange("featured")}>
            Nổi bật
          </button>
          <button className={tabClasses("sale")} onClick={() => handleTabChange("sale")}>
            Giảm giá
          </button>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
          {categorizedProducts[activeTab].length > 0 ? (
            categorizedProducts[activeTab].map((product) => (
              <div
                key={product.id}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white rounded-lg shadow-md overflow-hidden"
              >
                <ProductItem product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500 font-medium">Hiện tại chưa có sản phẩm trong danh mục này.</p>
              <p className="text-sm text-gray-400 mt-2">Hãy quay lại sau nhé!</p>
            </div>
          )}
        </div>
      </section>

      <br />
      <WhyChooseUs />
      <br />
      <CustomerReviews />
      <br />
      <BusinessPartners />
      <br />
      <NewsCarousel />
      <br />
    </div>
  );
};

export default Home;