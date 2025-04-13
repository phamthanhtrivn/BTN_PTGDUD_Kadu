// ArticleCard.jsx
import React from "react";
import "./ArticleCard.css";
// Hàm format ngày tháng (dd/mm/yyyy) hoặc tuỳ ý
const formatDate = (time) => {
  const dateObj = new Date(time);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};
const ArticleCard = ({ article, onClick }) => {
  return (
    <div
      className="w-full max-w-xs bg-white rounded-md shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer transition-all duration-300 overflow-hidden flex flex-col h-full"
      onClick={onClick}
    >
      {/* Ảnh bài viết */}
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-36 object-cover flex-shrink-0"
          loading="Lazy"
        />
      )}

      {/* Tiêu đề */}
      <h2 className="font-bold text-base pt-3 px-3 line-clamp-2 flex-shrink-0">
        {article.title}
      </h2>

      {/* Khối nội dung “ở dưới cùng” */}
      <div className="p-3 mt-auto">
        {/* Thời gian */}
        <div className="flex items-center text-gray-500 text-sm mb-2 space-x-2">
          <div className="flex items-center">
            <i className="fa-solid fa-calendar-days mr-1"></i>
            <span>{formatDate(article.timeRelease)}</span>
          </div>
        </div>

        {/* Nội dung tóm tắt (excerpt) */}
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {article.content[0].text || "Nội dung tóm tắt bài viết..."}
        </p>

        {/* Nút Xem thêm */}
        <div>
          <button className="text-blue-600 text-sm hover:text-blue-700 font-medium inline-flex items-center">
            Xem thêm
            <span className="ml-1 text-xs">&#8594;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
//
