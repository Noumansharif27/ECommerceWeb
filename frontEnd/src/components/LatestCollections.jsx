import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";

const LatestCollections = () => {
  const { products, currency } = useContext(ShopContext);

  let [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
    // console.log(products);
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Tittle text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
          dignissimos ipsam nihil, sed illum atque laborum eos vel ad ducimus
          corrupti hic quia est vitae adipisci minima perspiciatis magnam
          voluptas, saepe error! Odio, tenetur fuga? Ducimus, non. Tenetur,
          officia sunt!
        </p>
      </div>

      <div className="w-full">
        <div className="collection_icon">
          <img src={assets.right_arrow} alt="next" />
        </div>
        <Link
          className="w-full flex items-center justify-between my-5"
          to="/collection"
        >
          <a href="/" className="text-xl">
            <strong>Winter Collection</strong>
          </a>
          <a href="/" className="underline">
            Shop now
          </a>
        </Link>
      </div>

      {/* Rendering Product */}
      <div className="flex gap-[2px] flex-nowrap overflow-x-auto hide-vertical-scroll h-auto">
        {latestProducts.map((product, index) => (
          <ProductItem
            key={index}
            id={product._id}
            image={product.image}
            name={product.name}
            discountPercentage={product.discountPercentage}
            price={
              <div className="flex gap-1 items-senter justify-start mb-3">
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

        <div className="flex flex-col items-start justify-center w-[19.875rem] h-[34.263rem] flex-shrink-0 pl-4 gap-1">
          <Link to="/collection">
            <p className="text-2xl">Collection Name</p>
            <a href="/" className="underline">
              View All
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestCollections;
