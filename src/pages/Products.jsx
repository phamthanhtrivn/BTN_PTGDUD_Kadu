/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import SearchBar from "../components/SearchBar";
import { images } from "../assets/assets";

const Products = () => {
  const { products, showSearchBar, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("");

  console.log("Products from ShopContext:", products); // Kiểm tra dữ liệu products

  const productPerPage = 8;
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPage = Math.ceil(filterProducts.length / productPerPage);

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((pre) => pre.filter((item) => item !== e.target.value));
    } else {
      setCategory((pre) => [...pre, e.target.value]);
    }
  };

  const applyFilters = () => {
    let filteredP = products;

    if (search && showSearchBar) {
      filteredP = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filteredP = filteredP.filter((product) =>
        category.includes(product.category)
      );
    }

    switch (sortType) {
      case "thap-den-cao":
        filteredP = [...filteredP].sort((a, b) => a.price - b.price);
        break;
      case "cao-den-thap":
        filteredP = [...filteredP].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    console.log("Filtered products:", filteredP); // Kiểm tra dữ liệu sau khi lọc
    setFilterProducts(filteredP);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (products && products.length > 0) {
      applyFilters();
    } else {
      setFilterProducts([]); // Đảm bảo filterProducts là mảng rỗng nếu không có dữ liệu
    }
  }, [category, products, sortType, search]);

  if (!products || products.length === 0) {
    return <div>Đang tải sản phẩm...</div>;
  }

  console.log("Current products to display:", currentProducts); // Kiểm tra currentProducts

  return (
    <>
      <SearchBar />
      <div className="flex flex-col sm:flex-row sm:gap-10 gap-1">
        <div className="min-w-50">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <img
              className={`h-4 sm:hidden transition-all duration-300 ${
                showFilter ? "rotate-90" : ""
              }`}
              src={images.dropdown_icon}
              alt="dropdown_icon"
            />
          </p>
          {/* Category Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">LOẠI SẢN PHẨM</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Bút viết"}
                  onChange={toggleCategory}
                />{" "}
                Bút viết
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Sách vở"}
                  onChange={toggleCategory}
                />{" "}
                Sách vở
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Đèn học"}
                  onChange={toggleCategory}
                />{" "}
                Đèn học
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Văn phòng phẩm"}
                  onChange={toggleCategory}
                />{" "}
                Văn phòng phẩm
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Giấy in"}
                  onChange={toggleCategory}
                />{" "}
                Giấy in
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 gap-2">
            <h1 className="text-base sm:text-2xl font-medium">SẢN PHẨM</h1>
            <div className="">
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="py-1.5 px-3 border "
              >
                <option value="mac-dinh">Sắp xếp mặc định</option>
                <option value="thap-den-cao">Giá từ thấp đến cao</option>
                <option value="cao-den-thap">Giá từ cao đến thấp</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
            {currentProducts.length > 0 ? (
              currentProducts.map((item, index) => (
                <ProductItem key={item.id} product={item} />
              ))
            ) : (
              <div>Không có sản phẩm nào để hiển thị</div>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-8">
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 border border-[#005E4F] ${
                  currentPage === index + 1 ? "bg-[#005E4F] text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;