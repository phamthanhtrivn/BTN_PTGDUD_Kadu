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

  // Object chứa danh mục đã lọc để tối ưu hiệu suất
  const categorizedProducts = {
    new: products.filter((p) => p.category === "new"),
    featured: products.filter((p) => p.category === "featured"),
    sale: products.filter((p) => p.category === "sale"),
  };

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const tabClasses = (tab) =>
    `pb-2 transition-all duration-300 ${
      activeTab === tab ? "border-b-2 border-black font-bold" : "text-gray-500 hover:text-black"
    }`;

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (!products.length) return <p className="text-center text-red-500">⚠ Không có sản phẩm nào!</p>;

  return (
    <div>
      <Banner />
      <CategorySection />
      <br />
      
      <h1 className="text-4xl font-bold mb-4 text-center">Sản phẩm</h1>
      
      <div className="flex justify-center space-x-6 border-b mb-4">
        <button className={tabClasses("new")} onClick={() => handleTabChange("new")}>Sản phẩm mới</button>
        <button className={tabClasses("featured")} onClick={() => handleTabChange("featured")}>Nổi bật</button>
        <button className={tabClasses("sale")} onClick={() => handleTabChange("sale")}>Giảm giá</button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categorizedProducts[activeTab].length > 0 ? (
          categorizedProducts[activeTab].map((product) => <ProductItem key={product.id} product={product} />)
        ) : (
          <p className="col-span-4 text-center text-gray-500">Không có sản phẩm nào.</p>
        )}
      </div>
      
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
