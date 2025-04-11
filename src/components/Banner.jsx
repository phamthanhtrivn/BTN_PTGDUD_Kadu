import { useState } from "react";

const FeatureBox = () => {
  const features = [
    {
      icon: "🚚",
      title: "Chuyển Phát Nhanh",
      subtitle: "Miễn phí đơn hàng trên 1000k",
    },
    {
      icon: "💳",
      title: "Thanh Toán An Toàn",
      subtitle: "Bảo mật 100%",
    },
    {
      icon: "🎁",
      title: "Phiếu Giảm Giá",
      subtitle: "Tận hưởng ưu đãi hấp dẫn",
    },
    {
      icon: "💬",
      title: "Hỗ Trợ 24/7",
      subtitle: "Tư vấn tận tình",
    },
  ];

  return (
    <div className="w-[320px] flex flex-col gap-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </span>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              {feature.subtitle}
            </p>
            <hr className="mt-2 border-gray-200 group-hover:border-purple-300 transition-colors duration-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

const Banner = () => {
  const banners = [
    {
      id: 1,
      image: "src/assets/banner/banner-2.jpeg",
      title: "Hăng say ngày hội",
      subtitle: "Giá chỉ từ 99.000 VNĐ",
      buttonText: "Mua ngay",
      link: "/products",
    },
    {
      id: 2,
      image: "src/assets/banner/banner-4.png",
      title: "Đón hè cực keo",
      subtitle: "Giảm 15%",
      buttonText: "Mua ngay",
      link: "/product/11",
    },
    {
      id: 3,
      image: "src/assets/banner/banner-5.jpeg",
      title: "Sách là người bạn vô giá",
      subtitle: "Tạo không gian làm việc tối giản",
      buttonText: "Tìm hiểu thêm",
      link: "/",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-50 py-10 px-4">
      <div className="flex gap-10 flex-wrap justify-center items-center max-w-[1440px] w-full">
        <div className="relative w-full max-w-[1000px] h-[380px] overflow-hidden flex-shrink-0 rounded-2xl shadow-2xl group">
          <div
            className="flex transition-all ease-in-out duration-700 h-full will-change-transform"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="min-w-full h-full relative overflow-hidden"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover transform scale-105 transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white bg-gradient-to-r from-black/60 to-transparent">
                  <h2 className="text-5xl font-extrabold drop-shadow-xl">
                    {banner.title}
                  </h2>
                  <p className="text-2xl mt-3 drop-shadow-lg">
                    {banner.subtitle}
                  </p>
                  <a
                    href={banner.link}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
                  >
                    {banner.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-white scale-125" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        <FeatureBox />
      </div>
    </div>
  );
};

export default Banner;
