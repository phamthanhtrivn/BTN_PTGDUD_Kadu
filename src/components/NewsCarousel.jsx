import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/NewsCarousel.css";
import { Link } from "react-router-dom";

// lấy dữ liệu fake từ API load
const NewsCarousel = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://67d3d6cb8bca322cc26b3c5d.mockapi.io/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Lỗi tải tin tức:", error));
  }, []);

  if (news.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg font-medium text-red-500 animate-pulse">
          ⚠ Đang tải tin tức...
        </p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 relative">
        <span className="relative z-10">📰 Tin tức nổi bật</span>
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        speed={1000}
        className="pb-12"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <article className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {item.description}
                </p>
                <Link
                  to={`/news/${item.id}`} // Điều hướng đến trang chi tiết với ID
                  className="mt-4 inline-block text-blue-500 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                >
                  Đọc thêm →
                </Link>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewsCarousel;
