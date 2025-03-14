import { useState, useEffect } from "react";


const FeatureBox = () => {
  const features = [
    { 
      icon: "🚚", 
      title: "Chuyển Phát Nhanh", 
      subtitle: "Miễn phí đơn hàng trên 1000k" 
    },
    { 
      icon: "💳", 
      title: "Thanh Toán An Toàn", 
      subtitle: "Bảo mật 100%" 
    },
    { 
      icon: "🎁", 
      title: "Phiếu Giảm Giá", 
      subtitle: "Tận hưởng ưu đãi hấp dẫn" 
    },
    { 
      icon: "💬", 
      title: "Hỗ Trợ 24/7", 
      subtitle: "Tư vấn tận tình" 
    },
  ];

  
  return (
    <div className="w-[320px] flex flex-col gap-4 p-6 bg-gray-100 rounded-md">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-4">
          <span className="text-3xl">{feature.icon}</span>
          <div>
            <h3 className="font-bold ">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.subtitle}</p>
            <hr />
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
      image: "src/assets/banner/banner-5.jpeg", 
      title: `"Sách là người bạn vô giá"`, 
      subtitle: "Tạo không gian làm việc tối giản", 
      buttonText: "Tìm hiểu thêm", 
      link: "/collections/office" 
    },
    { 
      id: 2, 
      image: "src/assets/banner/banner-2.jpeg", 
      title: "Đón hè cực keo", 
      subtitle: "Giảm 15%", 
      buttonText: "Mua ngay", 
      link: "/product/1" 
    },
    { 
      id: 3, 
      image: "src/assets/banner/banner-4.png", 
      title: "Hăng say ngày hội", 
      subtitle: "Giá chỉ từ 99.000 VNĐ", 
      buttonText: "Mua ngay", 
      link: "/product/2" 
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="flex gap-6 items-center w-full">
      {/* Banner */}
      <div className="relative w-[800px] h-[400px] overflow-hidden flex-shrink-0">
        <div className="flex transition-transform duration-500 h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full h-full relative">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-center items-start p-10 text-white bg-black/40">
                <h2 className="text-2xl font-bold">{banner.title}</h2>
                <p className="text-lg mt-2">{banner.subtitle}</p>
                <a href={banner.link} className="mt-4 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">
                  {banner.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Box */}
      <FeatureBox />
    </div>
  );
};

export default Banner;