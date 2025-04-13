import { useState, useEffect, useRef } from "react";

// hiển thị nội dung ở page Home
const reasons = [
  {
    icon: "https://cdn-icons-png.flaticon.com/128/1086/1086525.png", // Icon hộp văn phòng phẩm
    title: "Sản phẩm đa dạng, chất lượng cao",
    description:
      "Cung cấp đầy đủ các loại văn phòng phẩm từ bút, giấy, đến dụng cụ học tập, đảm bảo chất lượng từ các thương hiệu uy tín.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/3095/3095222.png", // Icon xe giao hàng
    title: "Giao hàng nhanh chóng, tiện lợi",
    description:
      "Hỗ trợ giao hàng toàn quốc, miễn phí vận chuyển cho đơn hàng trên 1.000.000 VNĐ, đảm bảo đúng hẹn.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/9357/9357070.png", // Icon phiếu giảm giá
    title: "Giá cả cạnh tranh, nhiều ưu đãi",
    description:
      "Cam kết giá tốt nhất, thường xuyên có chương trình giảm giá, tặng voucher cho khách hàng thân thiết.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/1087/1087085.png", // Icon tai nghe hỗ trợ
    title: "Hỗ trợ tận tâm 24/7",
    description:
      "Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn mọi lúc, giải đáp mọi thắc mắc về sản phẩm và dịch vụ.",
  },
];

const WhyChooseUs = () => {
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
      className="why-choose-us py-12 bg-gradient-to-b from-gray-50 to-white"
    >
      <div
        className={`text-center transition-all duration-700 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          TẠI SAO NÊN CHỌN MUA VĂN PHÒNG PHẨM TẠI ĐÂY?
        </h2>
      </div>

      <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center transition-all duration-700 ease-out transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <img
              src={reason.icon}
              alt={reason.title}
              className="w-16 h-16 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {reason.title}
            </h3>
            <p className="text-gray-600 text-sm">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
