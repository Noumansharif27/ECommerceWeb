import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import ProductItem from "./ProductItem";

const RelatedPrduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productCopy.slice(0, 5));
    }
  }, [products]);
  return (
    <div className="my-5">
      <div className="text-center text-3xl py-2">
        <Tittle text1={"RELATED"} text2={"ITEM"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((product, index) => (
          <ProductItem
            key={index}
            name={product.name}
            image={product.image}
            price={product.price}
            id={product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedPrduct;
