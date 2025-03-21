import { useState, useRef } from "react";
import { images } from "../assets/assets";

export default function LogoSlide() {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const logos = [
    images.logo1, images.logo2, images.logo3, images.logo4, images.logo5
  ];

  const slideWidth = sliderRef.current ? sliderRef.current.clientWidth : 0;
  
  const goToSlide = (index) => {
    if (sliderRef.current) {
      const scrollX = index * slideWidth;
      sliderRef.current.scrollTo({ left: scrollX, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  return (
    <div className="bg-white p-6 text-center relative">
      <div ref={sliderRef} className="flex gap-14 overflow-x-auto whitespace-nowrap px-4 scrollbar-hide" style={{ scrollBehavior: "smooth", overflow: "hidden" }}>
        {logos.map((logo, index) => (
          <img key={index} src={logo} alt={`Logo ${index + 1}`} className="h-33 w-auto flex-shrink-0" />
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-4">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === index ? "bg-pink-300" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
