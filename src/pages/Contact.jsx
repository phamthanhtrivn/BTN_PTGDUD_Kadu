import { useState, useEffect } from "react";
import { images } from "../assets/assets";
import LogoSlide from "../components/LogoSlide"; 
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    title: "",
    message: ""
  });

  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    document.title = "Liên hệ với chúng tôi";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleShowRequests = () => {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(storedRequests);
    setShowRequests(!showRequests);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    formData.append("access_key", "33bcf7a8-2da3-4e5a-aa0b-c50751127bb5");
  
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
  
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());
  
    if (res.success) {
      const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
      storedRequests.push(object);
      localStorage.setItem("requests", JSON.stringify(storedRequests));
  
      Swal.fire({
        title: "Gửi yêu cầu thành công!",
        text: "Click OK!",
        icon: "success"
      });
      setFormData({ name: "", phone: "", title: "", message: "" });
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h2 className="text-2xl font-bold">LIÊN HỆ VỚI CHÚNG TÔI</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 bg-white p-6 shadow-lg rounded-lg">
          <h4 className="text-lg font-bold mb-4">GỬI YÊU CẦU</h4>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Họ tên"
              className="w-full p-3 border rounded-lg"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              className="w-full p-3 border rounded-lg"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="Tiêu đề"
              className="w-full p-3 border rounded-lg"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Nội dung"
              className="w-full p-3 border rounded-lg"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <div className="flex gap-4">
              <button type="submit" className="w-30 bg-[#005E4F] text-white p-2 rounded-lg border border-transparent hover:bg-white hover:text-[#005E4F] hover:border-[#005E4F] cursor-pointer">
                Gửi tin nhắn
              </button>
              <button type="button" onClick={handleShowRequests} className="w-30 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-700">
                {showRequests ? "Ẩn yêu cầu" : "Xem yêu cầu"}
              </button>
            </div>
          </form>
          {showRequests && (
            <div className="mt-6 p-4 bg-gray-100 border rounded-lg">
              <h2 className="text-[#005E4F] font-bold mb-2">Danh sách yêu cầu</h2 >
              {requests.length === 0 ? (
                <p className="text-gray-500">Bạn chưa gửi yêu cầu nào.</p>
              ) : (
                <ul className="list-disc pl-5">
                  {requests.map((req, index) => (
                    <li key={index} className="border-b py-2">
                      <strong>{req.title}</strong>
                      <br />
                      NỘI DUNG: {req.message} <br />
                      <span className="text-sm text-gray-600">{req.name} | {req.phone}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="bg-[#005E4F] text-white p-3 shadow-lg rounded-lg h-55 overflow-auto">
          <h5 className="text-lg mb-2">BẠN CẦN GẶP TRỰC TIẾP</h5><br />
          <div className="space-y-2">
            <p>Địa chỉ: 12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh</p>
            <p>Số điện thoại: 0123456789</p>
            <p>Email: nhom15ptgdud@iuh.edu</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5476554497323!2d106.69324817578551!3d10.770087259319814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e94b7bb8b7%3A0x8b7bb8b7c956157b!2zRkFIQVNBIExhYyBYdcOibiBCb29rc3RvcmU!5e0!3m2!1svi!2s!4v1710527459984!5m2!1svi!2s"
          width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy"
        ></iframe>
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-[#005E4F] mt-4">KHÁCH HÀNG & ĐỐI TÁC</h2>
      <div className="bg-white-100 py-3 shadow-lg rounded-lg">
        <div className="container mx-auto px-5 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <h3 className="text-xl font-semibold text-center mb-1 text-[#005E4F] border-b-2 border-blue-500 inline-block pb-1 w-fit mx-auto">KHÁCH HÀNG</h3>
            <h3 className="text-xl font-semibold text-center mb-1 text-[#005E4F] border-b-2 border-blue-500 inline-block pb-1 w-fit mx-auto">ĐƠN VỊ CUNG CẤP</h3>
            <div className="bg-gray-200 p-6">
              <p className="italic text-gray-600">
                “Công ty mình đã mua sản phẩm của Kadu được 02 năm nay, cảm thấy chất lượng rất tốt, nhân viên giao hàng nhiệt tình, chuyên nghiệp. Đặc biệt, sản phẩm luôn đảm bảo đúng tiêu chuẩn, bền bỉ và đáp ứng tốt nhu cầu sử dụng của công ty. Kadu không chỉ mang đến những sản phẩm chất lượng mà còn có dịch vụ chăm sóc khách hàng chu đáo, sẵn sàng hỗ trợ khi cần.”  
              </p>
              <p className="text-red-600 font-bold text-right mt-3">
                CÔNG TY TNHH PHẦN MỀM NHÂN HÒA
              </p>
            </div>
              <LogoSlide />
            </div>
        <div className="mt-8 flex justify-center gap-15">
          <a href="https://www.facebook.com/fahasa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <img src={images.facebook_icon} alt="Facebook" className="h-10" style={{ width: '80px', height: '80px' }} />
            <span className="text-lg font-medium">facebook/kadu</span>
          </a>
          <a href="https://www.instagram.com/fahasa_official/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <img src={images.instagram_icon} alt="Instagram" className="h-10" style={{ width: '45px', height: '45px' }}/>
            <span className="text-lg font-medium">instagram/kadu</span>
          </a>
          <a href="https://www.tiktok.com/@fahasa_official" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <img src={images.tiktok_icon} alt="TikTok" className="h-10" style={{ width: '75px', height: '75px' }}/>
            <span className="text-lg font-medium">tiktok/kadu</span>
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
