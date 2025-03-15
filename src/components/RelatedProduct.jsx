/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const RelatedProduct = ({ category }) => {
  const { products } = useContext(ShopContext);

  let productsCopy = products.slice();
  productsCopy = productsCopy.filter(
    (product) => product.category === category
  );

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-2">
        <p className="text-2xl font-bold">Các sản phẩm liên quan</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 place-content-center max-w-fit mx-auto mt-2">
        {productsCopy.slice(0, 4).map((p, index) => (
          <ProductItem
            key={index}
            id={p._id}
            name={p.name}
            price={p.price}
            image={p.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
