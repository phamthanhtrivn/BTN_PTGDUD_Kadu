import logo from "./logo.svg"
import cart_icon from "./cart_icon.png"
import search_icon from "./search_icon.png"
import profile_icon from "./profile_icon.png"
import menu_icon from "./menu_icon.png"
import dropdown_icon from "./dropdown_icon.png"


export const images = {
  logo,
  search_icon,
  cart_icon,
  profile_icon,
  menu_icon,
  dropdown_icon
};

export const products = [
  {
    id: 1,
    name: "Bút gel B - Minimalist Butter Gel Thiên Long GELB-023",
    price: 15000,
    category: "Bút viết",
    brand: "Thiên Long",
    size: "133.16 x 15 mm",
    origin: "Việt Nam",
    recommended:
      "Tránh nguồn nhiệt, hóa chất. Không thích hợp cho trẻ dưới 3 tuổi.",
    description:
      "Bút gel Thiên Long GELB-023 có thiết kế đơn giản, dễ cầm nắm, phù hợp cho học sinh và dân văn phòng.",
    image: "https://product.hstatic.net/1000230347/product/artboard_3_f40b5b71366744378c520a9cb88c1a84.jpg"
  },
  {
    id: 2,
    name: "Sổ tay ghi chú A5 - 100 trang",
    price: 25000,
    category: "Sách vở",
    brand: "Campus",
    size: "148 x 210 mm",
    origin: "Việt Nam",
    recommended: "Bảo quản nơi khô ráo, tránh nước.",
    description:
      "Sổ tay ghi chú A5 với bìa cứng, giấy mịn, thích hợp cho việc ghi chép hàng ngày.",
    image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/299/021/products/8936038729755.jpg?v=1722847728187"
  },
  {
    id: 3,
    name: "Bút máy Hồng Hà 2254",
    price: 45000,
    category: "Bút viết",
    brand: "Hồng Hà",
    size: "135 x 12 mm",
    origin: "Việt Nam",
    recommended: "Tránh va đập mạnh, đậy nắp sau khi sử dụng.",
    description:
      "Bút máy Hồng Hà 2254 với ngòi thép không gỉ, nét viết êm ái, mực ra đều.",
    image: "https://bizweb.dktcdn.net/thumb/large/100/334/874/products/2256-2-b88a2932-092f-42ee-9a6f-8549b910f47d.jpg?v=1690182896573"
  },
  {
    id: 4,
    name: "Đèn học LED để bàn cảm ứng bảo vệ mắt",
    price: 320000,
    category: "Đèn học",
    brand: "Điện Quang",
    size: "400 x 150 mm",
    origin: "Việt Nam",
    recommended:
      "Tránh để gần nguồn nhiệt cao, không sử dụng trong môi trường ẩm ướt.",
    description:
      "Đèn học LED cảm ứng bảo vệ mắt, điều chỉnh được nhiều chế độ sáng, tiết kiệm điện năng.",
    image: "https://product.hstatic.net/1000253446/product/dkl14_r_e6df69a754ae487fb645ca2468901602_master.png"
  },
  {
    id: 5,
    name: "Giấy in A4 Double A 70gsm - 500 tờ",
    price: 85000,
    category: "Giấy in",
    brand: "Double A",
    size: "210 x 297 mm",
    origin: "Việt Nam",
    recommended: "Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.",
    description:
      "Giấy in A4 Double A 70gsm, độ trắng cao, in rõ nét, phù hợp cho máy in và máy photocopy.",
    image: "https://hoangminhoffice.com/wp-content/uploads/2021/05/giay-in-4.jpg"
  },
  {
    id: 6,
    name: "Tập vở 200 trang Hồng Hà",
    price: 28000,
    category: "Sách vở",
    brand: "Hồng Hà",
    size: "175 x 250 mm",
    origin: "Việt Nam",
    recommended: "Tránh nước, không gập mép giấy.",
    description:
      "Tập vở Hồng Hà 200 trang, giấy dày, nét mực không bị nhòe, thích hợp cho học sinh và sinh viên.",
      image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/334/874/products/vo-4-o-ly-200-trang-hong-ha-0588.jpg?v=1657274747870"
  },
  {
    id: 7,
    name: "Bút bi Thiên Long TL-027",
    price: 5000,
    category: "Bút viết",
    brand: "Thiên Long",
    size: "140 x 10 mm",
    origin: "Việt Nam",
    recommended: "Không bấm mạnh khi viết, tránh va đập.",
    description:
      "Bút bi Thiên Long TL-027, mực ra đều, viết trơn mượt, giá thành hợp lý.",
      image: "https://product.hstatic.net/1000230347/product/artboard_6_993a955c7bc34ed983cf23d627053848.jpg"
  },
  {
    id: 8,
    name: "Đèn học để bàn Philips - bảo vệ mắt",
    price: 450000,
    category: "Đèn học",
    brand: "Philips",
    size: "450 x 180 mm",
    origin: "Việt Nam",
    recommended: "Vệ sinh thường xuyên, tránh tiếp xúc trực tiếp với nước.",
    description:
      "Đèn học Philips bảo vệ mắt, ánh sáng dịu nhẹ, thiết kế hiện đại, phù hợp cho góc học tập và làm việc.",
      image: "https://down-vn.img.susercontent.com/file/vn-11134201-7ra0g-m6s2i55mzbqwf1"
  },
  {
    id: 9,
    name: "Giấy note dán nhiều màu - 100 tờ",
    price: 15000,
    category: "Giấy in",
    brand: "Stick Note",
    size: "76 x 76 mm",
    origin: "Việt Nam",
    recommended: "Tránh nước, bảo quản nơi khô ráo.",
    description:
      "Giấy note dán nhiều màu, dễ dàng ghi chú và dán lên nhiều bề mặt khác nhau.",
      image: "https://down-vn.img.susercontent.com/file/sg-11134201-7rceb-lqtzwl38xch814"
  },
  {
    id: 10,
    name: "Sổ lò xo A4 200 trang",
    price: 50000,
    category: "Sách vở",
    brand: "Campus",
    size: "210 x 297 mm",
    origin: "Việt Nam",
    recommended: "Tránh ánh nắng trực tiếp, không bẻ cong.",
    description:
      "Sổ lò xo A4 200 trang, thiết kế lò xo tiện lợi, giấy dày, phù hợp cho ghi chép và vẽ phác thảo.",
      image: "https://www.anlocviet.vn/upload/product/a4-200-trang-8490.jpg"
  },
  {
    id: 11,
    name: "Keo dán giấy Pritt Stick 20g",
    price: 12000,
    category: "Văn phòng phẩm",
    brand: "Pritt",
    size: "20g",
    origin: "Việt Nam",
    recommended: "Đậy nắp sau khi sử dụng, tránh ánh nắng trực tiếp.",
    description: "Keo dán giấy Pritt Stick 20g, khô nhanh, không gây lem.",
    image: "https://mcgrocer.com/cdn/shop/files/1f7517d1c05f0daba1a86473370c7e37_359020cd-bb5a-4ee4-b896-373ce360906c_grande.jpg?v=1738843997"
  },
  {
    id: 12,
    name: "Bìa hồ sơ A4 nhiều màu",
    price: 18000,
    category: "Văn phòng phẩm",
    brand: "Kingfile",
    size: "A4",
    origin: "Việt Nam",
    recommended: "Tránh nước và ánh nắng trực tiếp.",
    description:
      "Bìa hồ sơ A4 nhiều màu, chất liệu bền, dễ phân loại tài liệu.",
      image: "https://product.hstatic.net/1000230347/product/fo-db007_nd_2_c5531df42dbf42059364d1db3d651f3b.jpg"
  },
  {
    id: 13,
    name: "Bút lông màu 12 chiếc",
    price: 55000,
    category: "Bút viết",
    brand: "Faber-Castell",
    size: "12 chiếc",
    origin: "Việt Nam",
    recommended: "Tránh nhiệt độ cao và nước.",
    description:
      "Bút lông màu Faber-Castell 12 chiếc, màu sắc tươi sáng, dễ sử dụng.",
      image: "https://www.anlocviet.vn/upload/product/but-long-mau-12-mau-vi-4553.jpg"
  },
  {
    id: 14,
    name: "Giấy in ảnh A4 20 tờ",
    price: 45000,
    category: "Giấy in",
    brand: "Kodak",
    size: "A4",
    origin: "Việt Nam",
    recommended: "Bảo quản nơi khô ráo, tránh nước.",
    description: "Giấy in ảnh Kodak, bề mặt bóng, cho chất lượng in sắc nét.",
    image: "https://down-vn.img.susercontent.com/file/d6f4846ea0876cdcbac2d8e401424e08"
  },
  {
    id: 15,
    name: "Gôm tẩy Thiên Long",
    price: 5000,
    category: "Văn phòng phẩm",
    brand: "Thiên Long",
    size: "45 x 20 mm",
    origin: "Việt Nam",
    recommended: "Tránh để gần lửa hoặc nguồn nhiệt cao.",
    description: "Gôm tẩy Thiên Long, tẩy sạch không làm rách giấy.",
    image: "https://product.hstatic.net/1000230347/product/img_9118_cfadd2ba303d476d8558851242494ec5.jpg"
  },
  {
    id: 16,
    name: "Bút chì gỗ 2B Thiên Long",
    price: 3000,
    category: "Bút viết",
    brand: "Thiên Long",
    size: "175 x 7 mm",
    origin: "Việt Nam",
    recommended: "Tránh va đập mạnh, không để gần nguồn nhiệt.",
    description: "Bút chì gỗ 2B Thiên Long, lõi chì mềm, dễ viết, dễ tẩy xóa.",
    image: "https://product.hstatic.net/1000230347/product/artboard_8_6876e24d08d94230a94ecd5a1a14e221.jpg"
  },
  {
    id: 17,
    name: "Giấy note hình trái tim - 100 tờ",
    price: 18000,
    category: "Giấy in",
    brand: "Stick Note",
    size: "76 x 76 mm",
    origin: "Việt Nam",
    recommended: "Tránh nước, bảo quản nơi khô ráo.",
    description:
      "Giấy note hình trái tim dễ thương, phù hợp cho việc ghi chú và trang trí.",
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lzc2cevrpowd07"
  },
  {
    id: 18,
    name: "Đèn học kẹp bàn chống cận",
    price: 380000,
    category: "Đèn học",
    brand: "Rạng Đông",
    size: "300 x 150 mm",
    origin: "Việt Nam",
    recommended: "Tránh nước, bảo quản nơi khô ráo.",
    description:
      "Đèn học kẹp bàn chống cận Rạng Đông, ánh sáng dịu nhẹ, bảo vệ mắt khi học tập.",
      image: "https://denrangdong.com.vn/wp-content/uploads/2024/03/Den-ban-LED-Rang-Dong-5W-RD-RL-01.V2.5W.jpg"
  },
  {
    id: 19,
    name: "Bút dạ quang nhiều màu - 6 chiếc",
    price: 45000,
    category: "Bút viết",
    brand: "Stabilo",
    size: "6 chiếc",
    origin: "Việt Nam",
    recommended: "Đậy nắp sau khi sử dụng, tránh ánh nắng trực tiếp.",
    description: "Bút dạ quang Stabilo 6 màu, dễ sử dụng, màu sắc nổi bật.",
    image: "https://bizweb.dktcdn.net/100/364/545/products/hl70-1-20afa724-7245-4030-84d2-0c7f80f2ade9.jpg?v=1704860050003"
  },
  {
    id: 20,
    name: "Tập vẽ A4 30 trang",
    price: 25000,
    category: "Sách vở",
    brand: "Hồng Hà",
    size: "210 x 297 mm",
    origin: "Việt Nam",
    recommended: "Tránh nước, bảo quản nơi khô ráo.",
    description:
      "Tập vẽ A4 Hồng Hà 30 trang, giấy dày, phù hợp cho bút chì màu và bút nước.",
      image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/334/874/products/8112-1.jpg?v=1695354604240"
  },
];
