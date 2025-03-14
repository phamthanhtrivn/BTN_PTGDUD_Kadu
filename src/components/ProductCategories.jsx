import { useState } from "react";
import "../styles/CategorySection.css";

const categories = [
  { name: "Bút viết", image: "https://cdn-icons-png.flaticon.com/128/235/235294.png" },
  { name: "Văn phòng phẩm", image: "https://cdn-icons-png.flaticon.com/128/1086/1086525.png" },
  { name: "Dụng cụ học tập", image: "https://cdn-icons-png.flaticon.com/128/3389/3389081.png" },
  { name: "Giấy in", image: "https://cdn2494.cdn-template-4s.com/thumbs/template/menu_icon_5_thumb_500.webp" },
  { name: "Đèn học", image: "https://cdn2494.cdn-template-4s.com/thumbs/template/menu_icon_9_thumb_500.webp" },
];

const CategorySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="category-section">
      <div className="category-header">
        <h2 className="category-title">
          CHÚNG TÔI CUNG CẤP VĂN PHÒNG PHẨM <span className="highlight">TOÀN QUỐC</span>
        </h2>
      </div>
      
      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${hoveredIndex === index ? "hovered" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="category-box">
              <img src={category.image} alt={category.name} className="category-image" />
              <span className="category-text">{category.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
