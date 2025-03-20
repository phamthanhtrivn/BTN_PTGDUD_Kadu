import logo from "./logo.svg";
import cart_icon from "./cart_icon.png";
import search_icon from "./search_icon.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.png";
import dropdown_icon from "./dropdown_icon.png";
import avatar from "./bigAvatar.png";
import logo_footer from "./logo_footer.svg";
import cross_icon from "./cross_icon.png";
import star_dull_icon from "./star_dull_icon.png"
import star_icon from "./star_icon.png"
import empty_cart from "./empty_cart.png"
import bigAvatar from "./bigAvatar.png"
import background from "./background.jpg"
export const images = {
  logo,
  search_icon,
  cart_icon,
  profile_icon,
  menu_icon,
  dropdown_icon,
  avatar,
  logo_footer,
  cross_icon,
  star_dull_icon,
  star_icon,
  empty_cart,
  bigAvatar,
  background,
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
    image:
      "https://product.hstatic.net/1000230347/product/artboard_3_f40b5b71366744378c520a9cb88c1a84.jpg",
    attributes: [
      {
        k: "Đường kính viên bi",
        v: "0.5 mm",
      },
      {
        k: "Tiêu chuẩn",
        v: "TCCS 009:2011/TL-BGEL",
      },
      {
        k: "Đóng gói",
        v: "01 cây/ kiện",
      },
    ],
  },
  {
    id: 2,
    name: "Sổ tay ghi chú bìa cứng A5 - 100 trang giấy trắng cao cấp",
    price: 25000,
    category: "Sách vở",
    brand: "Campus",
    size: "148 x 210 mm",
    origin: "Việt Nam",
    recommended: "Bảo quản nơi khô ráo, tránh nước.",
    description:
      "Sổ tay ghi chú A5 với bìa cứng, giấy mịn, thích hợp cho việc ghi chép hàng ngày.",
    image:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/299/021/products/8936038729755.jpg?v=1722847728187",
    attributes: [
      {
        k: "Định lượng",
        v: "100 gsm",
      },
      {
        k: "Độ trắng",
        v: "90%",
      },
      {
        k: "Số trang",
        v: "120 trang",
      },
    ],
  },
  {
    id: 3,
    name: "Bút máy Hồng Hà 2254 ngòi mực cao cấp",
    price: 45000,
    category: "Bút viết",
    brand: "Hồng Hà",
    size: "135 x 12 mm",
    origin: "Việt Nam",
    recommended: "Tránh va đập mạnh, đậy nắp sau khi sử dụng.",
    description:
      "Bút máy Hồng Hà 2254 với ngòi thép không gỉ, nét viết êm ái, mực ra đều.",
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/334/874/products/2256-2-b88a2932-092f-42ee-9a6f-8549b910f47d.jpg?v=1690182896573",
    attributes: [
      {
        k: "Trọng lượng",
        v: "15g",
      },
      {
        k: "Loại mực",
        v: "Mực nước, không lem",
      },
      {
        k: "Kiểu dáng",
        v: "Thân bút tròn, cầm chắc tay",
      },
    ],
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
    image:
      "https://product.hstatic.net/1000253446/product/dkl14_r_e6df69a754ae487fb645ca2468901602_master.png",
    attributes: [
      { k: "Công suất", v: "5W" },
      { k: "Chất liệu", v: "Nhựa ABS cao cấp" },
      { k: "Độ sáng", v: "400 lumen" },
    ],
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
    image:
      "https://hoangminhoffice.com/wp-content/uploads/2021/05/giay-in-4.jpg",
    attributes: [
      { k: "Trọng lượng", v: "70gsm" },
      { k: "Độ trắng", v: "92 ISO" },
      { k: "Đóng gói", v: "500 tờ/xấp" },
    ],
  },
  {
    id: 6,
    name: "Tập vở Hồng Hà 200 trang, giấy trắng mịn",
    price: 28000,
    category: "Sách vở",
    brand: "Hồng Hà",
    size: "175 x 250 mm",
    origin: "Việt Nam",
    recommended: "Tránh nước, không gập mép giấy.",
    description:
      "Tập vở Hồng Hà 200 trang, giấy dày, nét mực không bị nhòe, thích hợp cho học sinh và sinh viên.",
    image:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/334/874/products/vo-4-o-ly-200-trang-hong-ha-0588.jpg?v=1657274747870",
    attributes: [
      { k: "Số trang", v: "200 trang" },
      { k: "Định lượng giấy", v: "70gsm" },
      { k: "Kiểu dáng", v: "Kẻ ngang, bìa cứng" },
    ],
  },
  {
    id: 7,
    name: "Bút bi Thiên Long TL-027 mực đậm, nét viết trơn tru",
    price: 5000,
    category: "Bút viết",
    brand: "Thiên Long",
    size: "140 x 10 mm",
    origin: "Việt Nam",
    recommended: "Không bấm mạnh khi viết, tránh va đập.",
    description:
      "Bút bi Thiên Long TL-027, mực ra đều, viết trơn mượt, giá thành hợp lý.",
    image:
      "https://product.hstatic.net/1000230347/product/artboard_6_993a955c7bc34ed983cf23d627053848.jpg",
    attributes: [
      { k: "Màu mực", v: "Xanh" },
      { k: "Kiểu bút", v: "Bút bi bấm" },
      { k: "Chất liệu", v: "Nhựa cao cấp" },
    ],
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
    image:
      "https://down-vn.img.susercontent.com/file/vn-11134201-7ra0g-m6s2i55mzbqwf1",
    attributes: [
      { k: "Công suất", v: "7W" },
      { k: "Chất liệu", v: "Kim loại + nhựa" },
      { k: "Độ sáng", v: "500 lumen" },
    ],
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
    image:
      "https://down-vn.img.susercontent.com/file/sg-11134201-7rceb-lqtzwl38xch814",
    attributes: [
      { k: "Chất liệu", v: "Giấy không keo" },
      { k: "Số tờ", v: "100 tờ" },
      { k: "Màu sắc", v: "Nhiều màu" },
    ],
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
    image: "https://www.anlocviet.vn/upload/product/a4-200-trang-8490.jpg",
    attributes: [
      { k: "Số trang", v: "200 trang" },
      { k: "Định lượng giấy", v: "80gsm" },
      { k: "Kiểu dáng", v: "Lò xo" },
    ],
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
    image:
      "https://mcgrocer.com/cdn/shop/files/1f7517d1c05f0daba1a86473370c7e37_359020cd-bb5a-4ee4-b896-373ce360906c_grande.jpg?v=1738843997",
    attributes: [
      { k: "Màu sắc", v: "Trắng" },
      { k: "Chất liệu", v: "Keo nước" },
    ],
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
    image:
      "https://product.hstatic.net/1000230347/product/fo-db007_nd_2_c5531df42dbf42059364d1db3d651f3b.jpg",
    attributes: [
      { k: "Màu sắc", v: "Nhiều màu" },
      { k: "Chất liệu", v: "Nhựa PP" },
      { k: "Kích thước", v: "210 x 297 mm" },
    ],
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
    image:
      "https://www.anlocviet.vn/upload/product/but-long-mau-12-mau-vi-4553.jpg",
    attributes: [
      { k: "Chất liệu", v: "Nhựa cao cấp" },
      { k: "Màu sắc", v: "Nhiều màu" },
    ],
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
    image:
      "https://down-vn.img.susercontent.com/file/d6f4846ea0876cdcbac2d8e401424e08",
    attributes: [
      { k: "Số tờ", v: "20 tờ" },
      { k: "Loại giấy", v: "Giấy ảnh bóng" },
      { k: "Định lượng giấy", v: "230gsm" },
    ],
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
    image:
      "https://product.hstatic.net/1000230347/product/img_9118_cfadd2ba303d476d8558851242494ec5.jpg",
    attributes: [
      { k: "Chất liệu", v: "Cao su tự nhiên" },
      { k: "Màu sắc", v: "Trắng" },
      { k: "Khối lượng", v: "20g" },
    ],
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
    image:
      "https://product.hstatic.net/1000230347/product/artboard_8_6876e24d08d94230a94ecd5a1a14e221.jpg",
    attributes: [
      { k: "Loại gỗ", v: "Gỗ tự nhiên" },
      { k: "Độ cứng", v: "2B" },
      { k: "Trọng lượng", v: "10g" },
    ],
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
    image:
      "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lzc2cevrpowd07",
    attributes: [
      { k: "Số tờ", v: "100 tờ" },
      { k: "Màu sắc", v: "Hồng" },
      { k: "Hình dạng", v: "Trái tim" },
    ],
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
    image:
      "https://denrangdong.com.vn/wp-content/uploads/2024/03/Den-ban-LED-Rang-Dong-5W-RD-RL-01.V2.5W.jpg",
    attributes: [
      { k: "Công suất", v: "5W" },
      { k: "Loại bóng", v: "LED" },
      { k: "Điện áp", v: "220V" },
    ],
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
    image:
      "https://bizweb.dktcdn.net/100/364/545/products/hl70-1-20afa724-7245-4030-84d2-0c7f80f2ade9.jpg?v=1704860050003",
    attributes: [
      { k: "Chất liệu mực", v: "Gốc nước" },
      { k: "Đầu bút", v: "Vát" },
    ],
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
    image:
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/334/874/products/8112-1.jpg?v=1695354604240",
    attributes: [
      { k: "Số trang", v: "30 trang" },
      { k: "Định lượng giấy", v: "120gsm" },
      { k: "Kiểu dáng", v: "Đóng gáy keo" },
    ],
  },
];

export const articles = [
  {
    id: 1,
    title: "Giới thiệu",
    timeRelease: Date.now(),
    image:
      "https://cdn3748.cdn-template-4s.com/thumbs/tin-tuc/blog-7_thumb_720_thumb_350.webp",
    content: [
      {
        text: "Chúng tôi có kinh nghiệm hơn 36 năm trong ngành nghiên cứu, sản xuất và phân phối bút viết, văn phòng phẩm, học cụ và dụng cụ mỹ thuật. Chúng tôi cung cấp các mặt hàng cho nhiều đối tượng khách hàng khác nhau, từ học sinh, sinh viên, giới văn phòng, từ sản phẩm cao cấp cho đến các loại bút viết phổ thông. Tất cả đều được tập đoàn Thiên Long nghiên cứu, sản xuất và phân phối.",
      },
      {
        image:
          "https://cdn3039.cdn-template-4s.com/media/banner/1200x516_9608a3ee720a42f2ba378d95529c7693.webp",
      },
      {
        subTitle: "Định hướng hoạt động",
        text: `ra đời với mong muốn mang sự tiện lợi cho khách hàng có nhu cầu văn phòng phẩm, học cụ, sản phẩm mỹ thuật có thể dễ dàng tiếp cận và chọn mua sản phẩm một cách nhanh chóng. Ngoài ra, còn mong muốn thay đổi thói quen tiêu dùng chọn mua văn phòng phẩm truyền thống, đem đến cho khách hàng một hệ thống cung cấp các sản phẩm văn phòng, giáo dục trực tuyến một nơi uy tín và đáng tin cậy.
        Đặt mục tiêu trở thành sàn thương mại điện tử hàng đầu Việt Nam chuyên về sản phẩm văn phòng, học cụ, dụng cụ mỹ thuật và tất cả các sản phẩm liên quan đến giáo dục`,
      },
      {
        subTitle: "Giá trị mang đến cho khách hàng",
        text: `xác định luôn trung thành với những giá trị cốt lõi của mình để luôn là sự lựa chọn hàng đầu của người tiêu dùng:
            - Hệ thống sản phẩm phong phú và đa dạng.
            - Thanh toán bảo mật, an toàn.
            - Giao hàng nhanh chóng trong 48 giờ.
            - Nền tảng công nghệ hiện đại, giao dịch thuận tiện nhanh chóng.`,
      },
      {
        subTitle: "Hệ thống phân phối",
        text: "Dựa vào hệ thống phân phối hơn 65.000 điểm bán trên toàn quốc, hơn 160 Nhà Phân Phối, 2 tổng kho tại Miền Bắc và Miền Nam được vận hàng bởi 4 Công ty thương mại có trụ sở tại Hà Nội, Đà Nẵng, TP. Hồ Chí Minh, Thiên Long sở hữu một nền tảng vững chắc trong việc xây dựng và phát triển hoạt động thương mại điện tử. Bên cạnh đó, hệ thống quản lý phân phối DMS của Thiên Long đã được chính thức được vận hành, Thiên Long càng có nhiều lợi thể để nâng cao chất lượng bán hàng trực tuyến phục vụ nhu cầu của khách hàng trên khắp nước Việt Nam.",
      },
    ],
  },
  {
    id: 2,
    title: "Những công dụng của bút bi vô cùng tiện ích",
    timeRelease: Date.parse("2022-10-10"),
    image:
      "https://cdn3748.cdn-template-4s.com/thumbs/tin-tuc/blog-6_thumb_720_thumb_350.webp",
    content: [
      {
        text: "Ngày nay, mua hàng trực tuyến ngày càng phổ biến. Ngoài việc mang đến nhiều lợi ích, thì mua hàng online tại Bitex còn giúp tiết kiệm thời gian và tối giản chi phí. Vậy, bạn đã biết quy trình mua hàng online tại Bitex chưa. Nếu chưa, hãy theo dõi bài viết ngay nhé!",
      },
      {
        subTitle: "1. Hướng dẫn quy trình mua hàng online tại BITEXSHOP",
        text: "Bitex là một sàn giao dịch tiền điện tử và cung cấp dịch vụ mua hàng trực tuyến. Dưới đây là quy trình tổng quan:",
      },
      {
        subTitle:
          "1.1 Tìm kiếm sản phẩm mà bạn muốn mua trên website BITEXSHOP",
        text: `Thao tác tìm kiếm sản phẩm rất đơn giản, là bạn chỉ cần khởi động trình duyệt và tìm kiếm tên sản phẩm. Sau khi nhấn nút "Tìm kiếm", thì sẽ cho ra kết quả sản phẩm bạn cần tìm đang được bán trên website với giá bao nhiêu.
         - Ví dụ minh họa: vào wesite bitexshop.com, tìm kiếm "máy tính casio" sẽ xuất hiện những kết quả để bạn lựa chọn.`,
      },
      {
        subTitle: "1.2 Xem kỹ về thông tin mặt hàng sản phẩm bạn muốn mua ",
        text: `Nếu bạn hài lòng với một mặt hàng được đề xuất trong phần trên website, bạn hãy nhấp vào mặt hàng đó để xem chi tiết. `,
      },
      {
        subTitle: "1.3 Thêm sản phẩm mặt hàng ưng ý vào giỏ hàng",
        text: `Tính năng giỏ hàng được sử dụng rất phổ biến trên trang mua sắm trực tuyến tại Bitex. Bạn chỉ cần nhấp vào nút/biểu tượng thêm vào giỏ hàng và sản phẩm của bạn sẽ tự động được thêm vào danh sách chờ.
          Sau đó, là bạn có thể thanh toán hoặc xem thêm sản phẩm và cung cấp của Bitex. Sau khi quyết định sản phẩm muốn mua, tiếp đến bạn nên chọn thêm mẫu mã, màu sắc, số lượng và phương thức vận chuyển và phương thức thanh toán.
          Mua hàng online bạn cần chọn mặt hàng và thêm vào giỏ hàng`,
      },
      {
        subTitle: "1.4 Hoàn tất thanh toán tiền hàng ",
        text: "Đây có thể coi là bước cuối cùng trong quy trình mua hàng trực tuyến tại Bitex. Sau khi chọn được sản phẩm ưng ý và hoàn tất các thủ tục trước đó, thì bạn sẽ tiến hành thanh toán tiền hàng.",
      },
      {
        subTitle: "2. Những tiện ích khi mua sắm hàng online tại Bitex",
        text: `Bitex là một sàn giao dịch điện tử và nền tảng thanh toán đa năng. Khi mua hàng tại Bitex, sẽ có một số tiện ích mà bạn có thể tận hưởng đó là: 
        Bitex cung cấp các sản phẩm chất lượng, luôn cập nhật mẫu mã mới. Điều này cho phép bạn chọn lựa sản phẩm phù hợp với nhu cầu và mục tiêu đầu tư của mình.
        Bitex tạo ra một môi trường giao dịch an toàn và đáng tin cậy nhất. Bitex áp dụng các biện pháp bảo mật cao nhằm đảm bảo an toàn cho tài sản của người dùng.
        Ngồi nhà săn được hàng sale, hàng tốt, giá hời và nhiều chương trình ưu đãi hấp dẫn chỉ có tại Bitex. 
        Tiết kiệm thời gian chi phí đi lại của khách hàng không cần giang nắng hay phải đội mưa và không phải mang vác hàng hóa nặng. 
        Sản phẩm luôn đảm bảo chính hãng, chất lượng và luôn cập nhật mẫu mới thường xuyên. 
        Bitex cung cấp một hệ thống thanh toán linh hoạt và cho phép bạn chọn nhiều phương thức thanh toán khác nhau. Bạn có thể sử dụng tiền mặt hoặc chuyển khoản ngân hàng, ví điện tử hoặc là thẻ tín dụng để mua hàng. 
        Bitex coi trọng việc cung cấp dịch vụ khách hàng tốt nhất cho người tiêu dùng. Họ có đội ngũ hỗ trợ chuyên nghiệp và tận tâm, luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn trong quá trình giao dịch.`,
      },
      {
        subTitle:
          "3. Mua hàng online tại website Bitex giao tận nhà, ưu đãi lớn",
        text: `Trong cuộc sống hiện đại ngày nay, thì ai cũng bận rộn với công việc và sự nghiệp của mình. Nắm bắt được nhu cầu của người tiêu dùng, Bitex với dịch vụ giao hàng và thu tiền tận nhà cho khách hàng. Chỉ cần lên website: https://bitexshop.com/ tìm kiếm sản phẩm muốn mua, đặt hàng và chờ nhận hàng.  
        Trang web của Bitex có đầy đủ thông tin bạn cần từ thông tin sản phẩm cho đến giá cả, hình ảnh sản phẩm, hướng dẫn sử dụng và bảo hành sản phẩm. Bạn chỉ cần bỏ ra một chút thời gian để tham khảo và lựa chọn cho mình sản phẩm phù hợp. Tiếp đến, là đặt hàng và chờ nhận hàng. 
        Hiện tại, Công ty Cổ phần Xuất Nhập Khẩu Bình Tây (BITEX) là nhà sản xuất các sản phẩm đồ dùng học tập và văn phòng phẩm tại Việt Nam và sở hữu sản phẩm chất lượng cao đến từ các nhãn hiệu nổi tiếng Smartkids, Officetex, Pilot, B.bag…. Công ty chuyên cung cấp đồ dùng học tập, thiết bị và văn phòng phẩm chất lượng cao và đảm bảo an toàn khi sử dụng. Đối với các mặt hàng mua tại Bitex bị lỗi do nhà sản xuất bạn có thể đổi trả sản phẩm trong vòng 14 ngày kể từ ngày mua hàng.`,
      },
    ],
  },
  {
    id: 3,
    title: "Bộ sưu tập mới của Erin Condren Pride Month",
    timeRelease: Date.parse("2022-10-10"),
    image:
      "https://cdn3748.cdn-template-4s.com/thumbs/tin-tuc/blog-2_thumb_720_thumb_350.webp",
    content: [
      {
        text: `Công ty VPP được thành lập từ năm 2000 kinh nghiệm trong lĩnh vực hoạt động văn phòng phẩm online và trực tiếp. Đội ngũ nhân viên có năng lực, nhiệt tình và tận tuỵ với công việc, hoạt động với phương trâm "Lợi ích của khách hàng luôn đặt lên hàng đầu".
          Hiện nay với công nghệ Internet phổ biến toàn cầu - Văn phòng phẩm VPP hoạt động với mục tiêu phục vụ tốt nhất nhu cầu của Quý khách hàng với tiêu chí là "Xem gì mua lấy"
          * Bán văn phòng phẩm online nhắm đáp ứng nhu cầu xem hình ảnh các sản phẩm trực tiếp để biết chính xác nhu cầu đặt hàng của mình. Chính vì vậy VPP tạo kênh bán hàng văn phòng phẩm online nhằm phục vụ tốt nhất, tối đã hoá lợi ích cho khách hàng.
          * Hình thức giao hàng: Giao hàng tận nơi theo yêu cầu của Quý khách hàng 
          * Thời gian giao hàng: Ngay sau khi nhận được đơn đặt hàng từ phía Quý khách hàng
          * Trường hợp Quý công ty yêu cầu cung cấp một số mặt hàng mà hiện tại Công ty VPP không có hoặc hết hàng, chúng tôi sẽ ra ngoài thị trường tìm đúng chủng loại, chất lượng mặt hàng mà Quý công ty yêu cầu, với giá cả cạnh tranh nhất.
          * Trong trường hợp (nếu có) Quý công ty khiếu nại sản phẩm kém chất lượng, Công ty VPP sẽ đổi lại mặt hàng theo đúng chất lượng mà Quý công ty yêu cầu. Nếu sản phẩm đó gây thiệt hại đến lợi ích kinh tế của Quý công ty, Công ty  VPP sẽ chịu trách nhiệm đền bù đối với hậu quả của mặt hàng kém chất lượng đó gây ra.`,
      },
    ],
  },
  {
    id: 4,
    title: "7 Mẹo tẩy bút chì trên tường sạch bóng, không để lại dấu vết",
    timeRelease: Date.parse("2022-10-10"),
    image:
      "https://cdn3748.cdn-template-4s.com/thumbs/tin-tuc/blog-9_thumb_720_thumb_350.webp",
    content: [
      {
        text: `Công ty VPP được thành lập từ năm 2000 kinh nghiệm trong lĩnh vực hoạt động văn phòng phẩm online và trực tiếp. Đội ngũ nhân viên có năng lực, nhiệt tình và tận tuỵ với công việc, hoạt động với phương trâm "Lợi ích của khách hàng luôn đặt lên hàng đầu".
          Hiện nay với công nghệ Internet phổ biến toàn cầu - Văn phòng phẩm VPP hoạt động với mục tiêu phục vụ tốt nhất nhu cầu của Quý khách hàng với tiêu chí là "Xem gì mua lấy"
          * Bán văn phòng phẩm online nhắm đáp ứng nhu cầu xem hình ảnh các sản phẩm trực tiếp để biết chính xác nhu cầu đặt hàng của mình. Chính vì vậy VPP tạo kênh bán hàng văn phòng phẩm online nhằm phục vụ tốt nhất, tối đã hoá lợi ích cho khách hàng.
          * Hình thức giao hàng: Giao hàng tận nơi theo yêu cầu của Quý khách hàng 
          * Thời gian giao hàng: Ngay sau khi nhận được đơn đặt hàng từ phía Quý khách hàng
          * Trường hợp Quý công ty yêu cầu cung cấp một số mặt hàng mà hiện tại Công ty VPP không có hoặc hết hàng, chúng tôi sẽ ra ngoài thị trường tìm đúng chủng loại, chất lượng mặt hàng mà Quý công ty yêu cầu, với giá cả cạnh tranh nhất.
          * Trong trường hợp (nếu có) Quý công ty khiếu nại sản phẩm kém chất lượng, Công ty VPP sẽ đổi lại mặt hàng theo đúng chất lượng mà Quý công ty yêu cầu. Nếu sản phẩm đó gây thiệt hại đến lợi ích kinh tế của Quý công ty, Công ty  VPP sẽ chịu trách nhiệm đền bù đối với hậu quả của mặt hàng kém chất lượng đó gây ra.`,
      },
    ],
  },
];
