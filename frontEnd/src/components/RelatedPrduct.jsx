import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import ProductItem from "./ProductItem";

const RelatedPrduct = ({ category, subCategory }) => {
  const { products, currency } = useContext(ShopContext);
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
            id={product._id}
            discountPercentage={product.discountPercentage}
            price={
              <div className="flex gap-1 items-senter justify-start">
                {/* Original Price */}

                {product.discountPercentage > 0 && product.originalPrice && (
                  <p className="text-gray-400 line-through text-sm">
                    {currency}
                    {product.originalPrice.toFixed(2)}
                  </p>
                )}

                {/* Sales Price */}
                <p
                  className={`font-bold text-md ${
                    product.discountPercentage > 0
                      ? "text-green-600"
                      : "text-black"
                  }`}
                >
                  {currency}
                  {product.salesPrice ? product.salesPrice.toFixed(2) : "0.00"}
                </p>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedPrduct;
