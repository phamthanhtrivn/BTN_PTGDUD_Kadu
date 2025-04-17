// THIS IS USE IN APP.jsx
import React, { useEffect, useState } from "react";
import { articles } from "../assets/assets";
import Article from "../components/Article";
import ArticleCard from "../components/ArticleCard";
import SidebarArticleItem from "../components/SidebarArticleItem";
const About = () => {
  const [mainArticle, setMainArticle] = useState({});
  useEffect(() => {
    setMainArticle(articles[0]);
  }, []);
  const hanleClick = (id) => {
    setMainArticle(articles.find((article) => article.id === id));
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt
    });
  };
  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 m-4 py-10 px-20">
        {/* Main Content chiếm 100% ở mobile, 70% ở md trở lên */}
        <div className="main-content w-full md:w-[70%]">
          <Article article={mainArticle} />
        </div>

        {/* Sidebar ẩn ở mobile, hiện ở md trở lên, chiếm 30% */}
        <div className="sidebar hidden md:w-[30%] md:flex flex-col gap-4">
          <h1 className="my-5 font-bold text-xl">Bài viết mới nhất</h1>
          {articles.map((article, index) => (
            <SidebarArticleItem
              key={index}
              article={article}
              onClick={() => hanleClick(article.id)}
            />
          ))}
        </div>
      </div>

      <h1 className="px-20 ml-4 font-bold text-2xl">Bài viết liên quan</h1>
      <div className="xem-them grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 px-20">
        {articles.slice(0, 4).map((article, index) => (
          <ArticleCard
            key={index}
            article={article}
            onClick={() => hanleClick(article.id)}
          />
        ))}
      </div>
    </>
  );
};
export default About;
