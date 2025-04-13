import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { images } from "../assets/assets";
import { useAuth } from "../context/AuthContext";

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

    setIsLoading(true);
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
    const { city, district, ward, street } = tempUser.address;
    if (!city || !district || !ward || !street) {
      toast.error("Vui lòng điền đầy đủ thông tin địa chỉ.");
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-black shadow-lg rounded-lg border-4 border-[#00453A]">
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
            <InfoInput
              label="Tỉnh/Thành phố"
              name="city"
              value={tempUser.address.city}
              onChange={handleChange}
            />
            <InfoInput
              label="Quận/Huyện"
              name="district"
              value={tempUser.address.district}
              onChange={handleChange}
            />
            <InfoInput
              label="Xã/Phường"
              name="ward"
              value={tempUser.address.ward}
              onChange={handleChange}
            />
            <InfoInput
              label="Địa chỉ"
              name="street"
              value={tempUser.address.street}
              onChange={handleChange}
            />
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
