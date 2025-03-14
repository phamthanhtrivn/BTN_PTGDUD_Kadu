
import axios from "axios";

const API_URL = "https://67d3d6cb8bca322cc26b3c5d.mockapi.io/news";

export const fetchNews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    return [];
  }
};
