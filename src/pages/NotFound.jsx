import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-[#f0fdfa] to-[#d1fae5] px-6 text-center">
      <img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
        alt="404 gif"
        className="w-72 h-72 mb-8 drop-shadow-lg"
      />
      <h1 className="text-5xl font-bold text-[#005E4F] mb-4 tracking-tight leading-snug">
        404 - Không tìm thấy trang!
      </h1>
      <p className="text-gray-600 text-lg mb-8 max-w-md">
        Rất tiếc! Trang bạn đang tìm không tồn tại hoặc đã bị xóa. Hãy quay lại
        trang chủ và tiếp tục hành trình mua sắm nhé!
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#005E4F] text-white rounded-full text-base font-medium shadow-md hover:bg-[#01725f] transition-all duration-300"
      >
        🏠 Quay về Trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
