import { useState, useEffect, useRef } from "react";
import "../styles/CategorySection.css";

import { useNavigate } from "react-router-dom";

// trang này chỉ hiển thị dữ liệu cơ bản, không liên quan đến backend
const categories = [
  {
    name: "Bút viết",
    image: "https://cdn-icons-png.flaticon.com/128/235/235294.png",
  },
  {
    name: "Văn phòng phẩm",
    image: "https://cdn-icons-png.flaticon.com/128/1086/1086525.png",
  },
  {
    name: "Sách vở",
    image: "https://cdn-icons-png.flaticon.com/128/3389/3389081.png",
  },
  {
    name: "Giấy in",
    image:
      "https://cdn2494.cdn-template-4s.com/thumbs/template/menu_icon_5_thumb_500.webp",
  },
  {
    name: "Đèn học",
    image:
      "https://cdn2494.cdn-template-4s.com/thumbs/template/menu_icon_9_thumb_500.webp",
  },
];

// dùng navigate để điều hướng trang sang bên /products
// click vào ảnh sẽ chuyển hướng sang trang Products

const CategorySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    const encoded = encodeURIComponent(categoryName);
    navigate(`/products?category=${encoded}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset tránh hiệu ứng lặp lại
        }
      },
      {
        threshold: 0.2, // Kích hoạt khi 20% section xuất hiện
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="category-section py-12 bg-white">
      <div
        className={`category-header text-center transition-all duration-700 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="category-title text-3xl md:text-4xl font-bold text-gray-800">
          CHÚNG TÔI CUNG CẤP VĂN PHÒNG PHẨM{" "}
          <span className="highlight text-purple-600">TOÀN QUỐC</span>
        </h2>
      </div>

      <div className="category-container max-w-7xl mx-auto mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item transition-all duration-700 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }} // Tạo hiệu ứng tuần tự
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div
              className={`category-box bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center ${
                hoveredIndex === index ? "hovered" : ""
              }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="category-image w-16 h-16 object-contain mb-2"
              />
              <span className="category-text text-gray-700 font-medium text-center">
                {category.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
