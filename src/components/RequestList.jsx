import { useState, useEffect } from "react";

const RequestList = ({ onClose }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(storedRequests);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <h3 className="text-xl font-bold mb-4">Danh sách yêu cầu đã gửi</h3>
        <button className="absolute top-2 right-2 text-red-600 text-xl" onClick={onClose}>
          ×
        </button>
        {requests.length === 0 ? (
          <p className="text-gray-500">Chưa có yêu cầu nào được gửi.</p>
        ) : (
          <ul className="space-y-2">
            {requests.map((req, index) => (
              <li key={index} className="border p-3 rounded-lg">
                <strong>{req.name}</strong> - {req.phone}
                <p><strong>Tiêu đề:</strong> {req.title}</p>
                <p><strong>Nội dung:</strong> {req.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RequestList;
