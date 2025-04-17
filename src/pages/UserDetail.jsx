import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { images } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const UserDetail = () => {
  const { token } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      city: "",
      district: "",
      ward: "",
      street: "",
    },
  });
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleChangePassword = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/forgot-password",
        { email: user.email }
      );
      toast.success(`✅ ${res.data.message}`);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "❌ Đã xảy ra lỗi!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setTempUser(user);
  };

  const handleSave = async () => {
    if (!handleCheckInput()) return;

    if (handleCheckInput()) {
      tempUser.address.city = selectedTinh;
      tempUser.address.district = selectedHuyen;
      tempUser.address.ward = selectedXa;
      setEditMode(false);
      setIsLoading(true);
    }
    alert(tempUser.address.city);
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/updateUserInfo",
        { user: tempUser },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Cập nhật thông tin thành công!");
        setEditMode(false);
        setRefreshTrigger((prev) => !prev); // Trigger reload
      }
    } catch (error) {
      toast.error("Cập nhật thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckInput = () => {
    if (tempUser.address.city === "Chọn tỉnh" || tempUser.address.district === "Chọn huyện" || tempUser.address.ward === "Chọn xã" || tempUser.address.street === "") {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const loadUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/get",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const data = response.data.user;
        setUser({
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          address: {
            city: data.address?.city || "",
            district: data.address?.district || "",
            ward: data.address?.ward || "",
            street: data.address?.street || "",
          },
        });
      }
    } catch (error) {
      toast.error("Không thể tải thông tin người dùng.");
    }
  };

  useEffect(() => {
    loadUser();
  }, [refreshTrigger]);
  const [tinh, setTinh] = useState([{
    name: "Hà Nội",
    code: "011"
  }]);
  useEffect(() => {
    axios.get("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")
      .then((response) => {
        const provinceData = response.data?.data?.data || [];
        const filtered = provinceData.map((item) => ({
          name: item.name,
          code: item.code
        }));
        setTinh(filtered);
      }).catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);
  const [isTinhOpen, setIsTinhOpen] = useState(false);
  const [selectedTinh, setSelectedTinh] = useState(!tempUser.address.city ? "Chọn tỉnh" : tempUser.address.city);
  const [huyen, setHuyen] = useState([{
    name: "Hà Đông",
    code: "011"
  }])
  const [selectedHuyen, setSelectedHuyen] = useState(!tempUser.address.district ? "Chọn huyện" : tempUser.address.district)
  const [isHuyenOpen, setIsHuyenOpen] = useState(false);
  const handleLoadHuyen = (codeTinh) => {
    axios.get(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${codeTinh}&limit=-1`)
      .then((response) => {
        const huyenData = response.data?.data?.data || [];
        const filtered = huyenData.map((item) => ({
          name: item.name,
          code: item.code
        }));
        setHuyen(filtered);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };
  const [xa, setXa] = useState([{
    name: "Hà Đông",
    code: "011"
  }])
  const [selectedXa, setSelectedXa] = useState(!tempUser.address.ward ? "Chọn xã" : tempUser.address.ward)
  const [isXaOpen, setIsXaOpen] = useState(false);
  const handleLoadXa = (codeHuyen) => {
    axios.get(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${codeHuyen}&limit=-1`)
      .then((response) => {
        const xaData = response.data?.data?.data || [];
        const filtered = xaData.map((item) => ({
          name: item.name,
          code: item.code
        }));
        setXa(filtered);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };
  return (
    <div className="mt-10 max-w-2xl mx-auto p-6 bg-white text-black shadow-lg rounded-lg border-4 border-[#00453A]">
      <div
        className="relative flex flex-col items-center p-6 bg-cover bg-center rounded-lg shadow-lg"
        style={{ backgroundImage: `url(${images.background})` }}
      >
        <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>

        <div className="relative flex flex-col items-center">
          <img
            src={images.user}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <h2 className="mt-4 text-2xl font-semibold text-white">
            {user.name}
          </h2>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {editMode ? (
          <>

            <div className="flex items-center justify-between my-5">
              <label className="text-black font-medium">Tỉnh/Thành phố</label>
              <div className="relative inline-block">
                <button
                  onClick={() => {
                    setIsTinhOpen(!isTinhOpen);
                    setIsHuyenOpen(false);
                    setIsXaOpen(false);
                  }}
                  className="min-w-[160px] p-2 border border-gray-300 rounded text-black text-end flex justify-between items-center"
                >
                  {selectedTinh}
                  <FontAwesomeIcon className="ms-2" icon={faCaretDown} />
                </button>
                {/* Dropdown */}
                {isTinhOpen && (
                  <div className="absolute left-0 top-full mt-1 w-[160px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <ul className="py-1">
                      {tinh.map((option, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            setSelectedTinh(option.name);
                            handleLoadHuyen(option.code);
                            setIsTinhOpen(false);
                          }}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          {option.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between my-5">
              <label className="text-black font-medium">Quận/Huyện</label>
              <div className="relative inline-block">
                <button
                  onClick={() => {
                    setIsHuyenOpen(!isHuyenOpen);
                    setIsTinhOpen(false);
                    setIsXaOpen(false);
                  }}
                  className="min-w-[160px] p-2 border border-gray-300 rounded text-black text-end flex justify-between items-center"
                >
                  {selectedHuyen}
                  <FontAwesomeIcon className="ms-2" icon={faCaretDown} />
                </button>

                {/* Dropdown */}
                {isHuyenOpen && (
                  <div className="absolute left-0 top-full mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <ul className="py-1">
                      {huyen.map((option, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            setSelectedHuyen(option.name);
                            handleLoadXa(option.code);
                            setIsHuyenOpen(false);
                          }}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          {option.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between my-5">
              <label className="text-black font-medium">Xã/Phường</label>
              <div className="relative inline-block">
                <button
                  onClick={() => {
                    setIsXaOpen(!isXaOpen);
                    setIsTinhOpen(false);
                    setIsHuyenOpen(false);
                  }}
                  className="min-w-[160px] p-2 border border-gray-300 rounded text-black text-end flex justify-between items-center"
                >
                  {selectedXa}
                  <FontAwesomeIcon className="ms-2" icon={faCaretDown} />
                </button>


                {/* Dropdown */}
                {isXaOpen && (
                  <div className="absolute left-0 top-full mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <ul className="py-1">
                      {xa.map((option, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            setSelectedXa(option.name);
                            setIsXaOpen(false);
                          }}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          {option.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <InfoInput label="Địa chỉ" name="street" value={tempUser.address.street} onChange={handleChange} />
          </>
        ) : (
          <>
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Số điện thoại" value={user.phone} />
            <InfoRow label="Tỉnh/Thành phố" value={user.address.city} />
            <InfoRow label="Quận/Huyện" value={user.address.district} />
            <InfoRow label="Xã/Phường" value={user.address.ward} />
            <InfoRow label="Địa chỉ" value={user.address.street} />
          </>
        )}
      </div>

      <div className="mt-6 flex space-x-4">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="w-full bg-[#005E4F] hover:bg-[#00453A] text-white font-semibold py-2 rounded-lg border border-white"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Lưu"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg border border-white"
            >
              Hủy
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="w-full bg-[#005E4F] hover:bg-[#00453A] text-white font-semibold py-2 rounded-lg border border-white"
          >
            Chỉnh sửa địa chỉ
          </button>
        )}
      </div>

      <button
        onClick={handleChangePassword}
        disabled={isLoading}
        className="mt-4 w-full bg-[#005E4F] hover:bg-[#00453A] text-white font-semibold py-2 rounded-lg border border-white"
      >
        {isLoading ? <FaSpinner className="animate-spin" /> : "Đổi mật khẩu"}
      </button>
    </div>
  );
};

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-300 pb-2">
      <span className="text-black font-medium">{label}:</span>
      <span className="text-black">{value}</span>
    </div>
  );
}

function InfoInput({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-black font-medium mb-1">{label}:</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded text-black"
      />
    </div>
  );
}

export default UserDetail;

// import { FormPassword } from '../components/FormPassword';
// import FormUpdateProfile from '../components/FormUpdateProfile';
// const UserDetail = () => {
//   return (
//     <section className="container mx-auto">
//       <div className="px-4 py-16 sm:px-6 lg:px-8">
//         <div className="flex gap-5 flex-col md:flex-row ">
//           <FormUpdateProfile />
//           <FormPassword />
//         </div>
//       </div>
//     </section>
//   );
// }
//
// import React, { useState } from "react";
