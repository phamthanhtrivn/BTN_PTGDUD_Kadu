import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

// dữ liệu này cũng tự tạo và dùng fetch or axios để load
// Danh sách đối tác kinh doanh
const partners = [
  {
    id: 1,
    name: "ThiênLong",
    logo: "data:image/png;base64,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",
  },
  {
    id: 2,
    name: "FlexOffice",
    logo: "https://thienlonggroup.com/storage/media/JEgMH8Yp5dgkqpeRFNaJTSH9NRrtQJ04sKguiQWh.png",
  },
  {
    id: 3,
    name: "Sharpie",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToweWhsWt3IufFDWigHE988eEd90BYdTecpg&s",
  },
  {
    id: 4,
    name: "Colokit",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAACAVBMVEX////62yAAAAD//v/8//////34///63B39/v///P/63Bv3///+//ovJyX72iD53CDbTin61Sr+2SAvJin/+f/5//v5//flMDDmMCziNS319fX//vb+2R362SnfTjATAB7o1zSoqKgtKSDh4eE1NTXJycnp6enb29uSkpI+Pj5gYGD23xclJyIrHyn/5TELABUWFhZ6bSKFhYW3t7fpzClWVlacnJzPz8/wzcn43UD79sr7+9r3/+z54xVcVBe2oTTvsy9dTyMAABvdbyDeNjdJSUkgICZ5eXm7u7vaOC1dXV3ec2z77bL26Yjy5lb03DD73lb65m/88s737Ib69rH35Jz68L7+9eD453P95qXz/+r765f73FKRhob43mfy6njz8KOumT5IPCXSvi/lgDSQgS4dDBEfKRm/rC3roygQCjMhHTEhDzB3ajITECziiCXsGz49NQ3eaDT0wzYzJhrr5hTaWBbsnyltWSk3MxNaVyk0LSAXDzoIGhjTwCa4oUaJhS2McSnZzT7bXlnOST7oo5v10dPYPTXZdhjjXTZlTyotGCnTEgjbjoTiQkubjyOciUHGp0npDgvguqjdn4jkwkDghn++TEXu3cX44ezMUDvMaWDBNCPptLTWOBPuzbfuYmDAb1z3x9LMiXfdcF3lfILGkHrKs5vfKwDyHSf0dXlppJxHAAAalklEQVR4nO1bCVcbV5YuqRbVRpVVqHaVwyrbFFYINnZpCzjIYLUMwoFG7pB28BYHux1ISEynPdOZGSHLnZTIjHEIXoTTHWcmml859xWL2b0cx505p77jg0RtvO/de79773tlDPPhw4cPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw4cPHz58+PDhw8f/D5AkT+KmSfDwxUynUsV0Os0TABlncJIk4cTr/XtGzICfr/WZ+wOPMLxCmcmzQ8NNTQXRLhQSIxfOTZx9v2jKnAwU8dc6nvbBwe7BwZNvkqIsE/z7QwmLDUgBVpACAUFgEezCuaGzqbRMAcnXNRwaa+4GA2LGYPNreuKLgDDPjlhsiA2JYiAqBAIBFr4ERDEalVjW+nB0LG2+vvk+OWj2NDQ0HCM7Dr22Z+4N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",
  },
  {
    id: 5,
    name: "Deli",
    logo: "https://vanphongphamminaco.com/wp-content/uploads/2022/10/Deli_logo_2.webp",
  },
  {
    id: 6,
    name: "Casio",
    logo: "https://cdn.worldvectorlogo.com/logos/casio-1121.svg",
  },
];

export default function PartnerSlider() {
  return (
    <div className="p-6 bg-gray-100 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-red-700 text-transparent bg-clip-text">
        🤝 Đối tác kinh doanh
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 25 },
        }}
      >
        {partners.map((partner) => (
          <SwiperSlide key={partner.id}>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 md:h-20 lg:h-24 object-contain mb-3"
              />
              <p className="text-lg md:text-xl font-semibold text-gray-800">
                {partner.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
