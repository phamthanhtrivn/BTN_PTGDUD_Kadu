/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { images } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, formatMoney, currency, handleAddToCart } =
    useContext(ShopContext);
  const [product, setProduct] = useState({});

  const [quantity, setQuantity] = useState(0);

  const dataProduct = () => {
    products.map((product) => {
      if (product.id == id) {
        setProduct(product);
      }
    });
  };

  useEffect(() => {
    dataProduct();
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-[50%]">
          <img className="w-full h-auto" src={product.image} alt="image" />
        </div>
        <div className="flex-1 flex flex-col items-start p-3 gap-3">
          <p className="text-2xl font-medium">{product.name}</p>
          <div className="flex gap-1 items-center">
            <img className="w-3.5" src={images.star_icon} alt="star_icon" />
            <img className="w-3.5" src={images.star_icon} alt="star_icon" />
            <img className="w-3.5" src={images.star_icon} alt="star_icon" />
            <img className="w-3.5" src={images.star_icon} alt="star_icon" />
            <img
              className="w-3.5"
              src={images.star_dull_icon}
              alt="star_dull_icon"
            />
            <p className="ml-2">(127)</p>
          </div>
          <p className="text-2xl font-bold mt-3">
            Giá: {formatMoney(product.price)} {currency}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center items-start gap-4">
            <input
              type="number"
              defaultValue={1}
              min={1}
              max={99}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="py-2 px-3.5 border border-gray-300 min-w-32 mt-3 rounded"
            />
            <button
              onClick={() => {
                handleAddToCart(Number(id), Number(quantity));
              }}
              className="flex items-center gap-3 justify-center mt-3 border border-[#005E4F] hover:text-[#005E4F] hover:bg-white rounded py-2 px-4 text-white bg-[#005E4F] transition-all duration-300"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Thêm vào giỏ hàng</span>
            </button>
          </div>
          <div>
            <p className="mt-3">Mô tả</p>
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden mt-3">
              <tbody className="divide-y divide-gray-200">
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-700">
                    Loại sản phẩm
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {product.category}
                  </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-700">
                    Thương hiệu
                  </td>
                  <td className="px-4 py-3 text-gray-600">{product.brand}</td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-700">
                    Kích thước
                  </td>
                  <td className="px-4 py-3 text-gray-600">{product.size}</td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-700">
                    Xuất xứ
                  </td>
                  <td className="px-4 py-3 text-gray-600">{product.origin}</td>
                </tr>
                {/* {product.attributes.map((item, index) => (
                  <tr key={index} className="odd:bg-gray-50 even:bg-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {item.k}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.v}</td>
                  </tr>
                ))} */}
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-700">
                    Khuyến cáo
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {product.recommended}
                  </td>
                </tr>
                <tr className="odd:bg-gray-50 even:bg-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-700">Mô tả</td>
                  <td className="px-4 py-3 text-gray-600">
                    {product.description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <RelatedProduct category={product.category} />
    </div>
  );
};

export default ProductDetail;
