import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import ProductItem from "./ProductItem";

const LatestCollections = () => {
  const { products, currency } = useContext(ShopContext);

  let [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
    // console.log(products);
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center -py-8 text-3xl">
        <Tittle text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
          dignissimos ipsam nihil, sed illum atque laborum eos vel ad ducimus
          corrupti hic quia est vitae adipisci minima perspiciatis magnam
          voluptas, saepe error! Odio, tenetur fuga? Ducimus, non. Tenetur,
          officia sunt!
        </p>
      </div>

      {/* Rendering Product */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((product, index) => (
          <ProductItem
            key={index}
            id={product._id}
            image={product.image}
            name={product.name}
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

export default LatestCollections;
