import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, name, price, image }) => {
  const { currency, formatMoney } = useContext(ShopContext);

  return (
    <Link
      className="text-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out w-full box-border p-5 shadow-lg sm:shadow-none"
      to={`/product/${id}`}
    >
      <div>
        <img src={image} />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium mt-1">
        {formatMoney(price)} {currency}
      </p>
    </Link>
  );
};

export default ProductItem;
