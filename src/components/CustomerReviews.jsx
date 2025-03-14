import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/CustomerReviews.css";
// npm install swiper

const reviews = [
  {
    id: 1,
    name: "Hoàng Dung",
    role: "Khách hàng thành viên",
    rating: 5,
    comment: "Tiền nào của đó, bên đây chất lượng thật, giá mềm hơn các chỗ khác. Ủng hộ nha!",
    image: "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/1/12/1449087/Joo-Ji-Hoon-Choo-You.jpg?w=660",
  },
  {
    id: 2,
    name: "Sở Bình",
    role: "Khách hàng thành viên",
    rating: 5,
    comment: "Lần đầu vào tôi thật sự rất bất ngờ, nhiều đồ lắm nha, lựa cả tiếng mà các bạn nhân viên vẫn vui vẻ và tư vấn nhiệt tình.",
    image: "https://danviet.mediacdn.vn/296231569849192448/2025/2/14/the-trauma-code-1a13-1739492857687-1739492857882206918659.jpg",
  },
  {
    id: 3,
    name: "Huỳnh Tuyến",
    role: "Khách hàng thành viên",
    rating: 5,
    comment: "Đồ đẹp lắm nha, 1 năm ghé không biết bao nhiêu lần, lần nào mua cho người yêu mình cũng rất thích. Sẽ luôn ủng hộ.",
    image: "https://danviet.mediacdn.vn/296231569849192448/2025/2/14/the-trauma-code-1a13-1739492857687-1739492857882206918659.jpg",
  },
  {
    id: 4,
    name: "Minh Châu",
    role: "Khách hàng mới",
    rating: 4,
    comment: "Sản phẩm ok lắm, sẽ giới thiệu cho bạn bè!",
    image: "https://danviet.mediacdn.vn/296231569849192448/2025/2/14/the-trauma-code-1a13-1739492857687-1739492857882206918659.jpg",
  },
  {
    id: 5,
    name: "Trung Kiên",
    role: "Khách hàng thân thiết",
    rating: 5,
    comment: "Chất lượng 10/10, sẽ quay lại mua tiếp.",
    image: "https://danviet.mediacdn.vn/296231569849192448/2025/2/14/the-trauma-code-1a13-1739492857687-1739492857882206918659.jpg",
  },
];

const CustomerReviews = () => {
  return (
    <div className="reviews-container">
      <h2>💬 Đánh giá của khách hàng</h2>
      <p className="sub-title">Cảm ơn sự tin tưởng của quý khách</p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="review-card">
              <img src={review.image} alt={review.name} className="avatar" />
              <h3>{review.name}</h3>
              <p className="role">{review.role}</p>
              <p className="stars">{"⭐".repeat(review.rating)}</p>
              <p className="comment">"{review.comment}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerReviews;
