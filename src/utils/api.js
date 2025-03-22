export const fetchProducts = async () => {
  try {
    const response = await fetch("https://67d0f9e5825945773eb281b6.mockapi.io/products");
    if (!response.ok) {
      throw new Error("Lỗi khi gọi API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return [];
  }
};

