import { useState, useEffect } from "react";
import { fetchProducts } from "../utils/api.js";
import Banner from "../components/Banner";
import "../styles/CustomerReviews.css";
import CustomerReviews from "../components/CustomerReviews";
import NewsCarousel from "../components/NewsCarousel.jsx";
import CategorySection from "../components/ProductCategories.jsx";
import BusinessPartners from "../components/Partners.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      console.log("Dữ liệu từ MockAPI:", data);
      setProducts(data);
      setLoading(false);
    });
  }, []);

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
