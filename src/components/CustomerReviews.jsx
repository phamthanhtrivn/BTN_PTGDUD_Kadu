/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/CustomerReviews.css";

const reviews = [
  {
    id: 1,
    name: "Hoàng Dung",
    role: "Khách hàng thành viên",
    rating: 5,
    comment:
      "Tiền nào của đó, bên đây chất lượng thật, giá mềm hơn các chỗ khác. Ủng hộ nha!",
    image:
      "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/1/12/1449087/Joo-Ji-Hoon-Choo-You.jpg?w=660",
  },
  {
    id: 2,
    name: "Sở Bình",
    role: "Khách hàng thành viên",
    rating: 5,
    comment:
      "Lần đầu vào tôi thật sự rất bất ngờ, nhiều đồ lắm nha, lựa cả tiếng mà các bạn nhân viên vẫn vui vẻ và tư vấn nhiệt tình.",
    image:
      "https://danviet.mediacdn.vn/296231569849192448/2025/2/14/the-trauma-code-1a13-1739492857687-1739492857882206918659.jpg",
  },
  {
    id: 3,
    name: "Huỳnh Tuyến",
    role: "Khách hàng thành viên",
    rating: 5,
    comment:
      "Đồ đẹp lắm nha, 1 năm ghé không biết bao nhiêu lần, lần nào mua cho người yêu mình cũng rất thích. Sẽ luôn ủng hộ.",
    image: "https://imedia.imuzik.com.vn/media1/ckfinder/images/2(61).jpg",
  },
  {
    id: 4,
    name: "Minh Châu",
    role: "Khách hàng mới",
    rating: 4,
    comment: "Sản phẩm ok lắm, sẽ giới thiệu cho bạn bè!",
    image:
      "https://phapluat.tuoitrethudo.vn/stores/news_dataimages/vuthihuyen/102019/09/07/10-meme-noi-tieng-nhat-internet-chac-chan-ai-cung-kinh-qua-mot-lan-28-.0631.jpg",
  },
  {
    id: 5,
    name: "Trung Kiên",
    role: "Khách hàng thân thiết",
    rating: 5,
    comment: "Chất lượng 10/10, sẽ quay lại mua tiếp.",
    image:
      "https://genk.mediacdn.vn/thumb_w/640/2016/4-success-kid-3596018b-1458201719100-1458267903230.jpg",
  },
];

const CustomerReviews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2,
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
    <div
      ref={sectionRef}
      className="reviews-container py-12 bg-gradient-to-b from-blue-50 to-white"
    >
      <div
        className={`text-center transition-all duration-700 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          💬 Đánh giá của khách hàng
        </h2>
        <p className="sub-title mt-2 text-gray-600">
          Cảm ơn sự tin tưởng của quý khách
        </p>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={review.id}>
              <div
                className={`review-card bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="avatar w-16 h-16 rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {review.name}
                </h3>
                <p className="role text-sm text-gray-500 mt-1">{review.role}</p>
                <p className="stars text-yellow-400 text-lg mt-2">
                  {"⭐".repeat(review.rating)}
                </p>
                <p className="comment text-gray-600 mt-3 italic">
                  "{review.comment}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Navigation buttons */}
        <div className="swiper-button-prev text-gray-600 hover:text-purple-600 transition-colors"></div>
        <div className="swiper-button-next text-gray-600 hover:text-purple-600 transition-colors"></div>
      </div>
    </div>
  );
};

export default CustomerReviews;
//
