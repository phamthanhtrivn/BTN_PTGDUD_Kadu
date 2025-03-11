import React from "react";
import "./ArticleCard.css";
const SidebarArticleItem = ({ article, onClick }) => {
  return (
    <div className="flex items-center gap-3 mb-4 hover:shadow-md hover:-translate-y-1 cursor-pointer transition-all duration-300" onClick={onClick}>
      <img src={article.image} alt={article.title} className="w-16 h-16 object-cover rounded" />
      <p className="text-sm font-medium line-clamp-2">{article.title}</p>
    </div>
  );
};
export default SidebarArticleItem;