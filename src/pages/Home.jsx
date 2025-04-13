import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../utils/api.js";
import Banner from "../components/Banner";
import "../styles/CustomerReviews.css";
import "../styles/ProductItem.css";
import AIChatBox from "../components/AIChatBox.jsx";

import CustomerReviews from "../components/CustomerReviews";
import NewsCarousel from "../components/NewsCarousel.jsx";
import CategorySection from "../components/ProductCategories.jsx";
import BusinessPartners from "../components/Partners.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";

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

  //đoạn này không sử dụng nữa
  // const categorizedProducts = {
  //   new: products.filter((p) => p.category === "new"),
  //   featured: products.filter((p) => p.category === "featured"),
  //   sale: products.filter((p) => p.category === "sale"),
  // };
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const tabClasses = (tab) =>
    `px-4 py-2 cursor-pointer transition-all duration-300 ${
      activeTab === tab
        ? "text-[#005E4F] border-b-4 border-[#005E4F] font-bold"
        : "text-gray-600 hover:text-[#005E4F] hover:border-b-2 hover:border-gray-300"
    }`;

  if (loading)
    return (
      <p className="text-center text-gray-500 py-10">Đang tải dữ liệu...</p>
    );

  if (!products.length)
    return (
      <p className="text-center text-red-500 py-10">⚠ Không có sản phẩm nào!</p>
    );

  return (
    <div className="bg-gray-50">
      <Banner />
      <CategorySection />
      <br />

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
