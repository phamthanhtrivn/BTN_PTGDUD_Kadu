import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const NewsCarousel = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://67d3d6cb8bca322cc26b3c5d.mockapi.io/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Lỗi tải tin tức:", error));
  }, []);

  if (news.length === 0) {
    return <p className="text-center text-red-500">⚠ Không có tin tức nào!</p>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-center mb-4">📰 Tin tức mới nhất</h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1} // Mặc định là 1 trên mobile
        breakpoints={{
          640: { slidesPerView: 2 }, // 2 trên tablet
          1024: { slidesPerView: 3 }, // 3 trên màn hình lớn
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        speed={1200} // Tốc độ trượt mượt hơn
        className="rounded-lg shadow-md"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white p-4 rounded-lg shadow-md transition-all hover:scale-105">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md mb-2" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsCarousel;
