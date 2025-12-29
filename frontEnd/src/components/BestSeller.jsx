import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import OurPolicies from "./OurPolicies";
import ProductItem from "./ProductItem";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { products, currency } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [showPreviewProduct, setShowPreviewProduct] = useState(false);
  const [size, setSize] = useState("");

  useEffect(() => {
    const bestProduct = products.filter((product) => product.bestSeller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);
  return (
    <div className="my-10">
      {/* ----- Dark Overlay----- */}
      {showPreviewProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-60 transition-opacity duration-300 cursor-pointer"
          onClick={() => setShowPreviewProduct(false)}
        ></div>
      )}

      {/* -------------- Product Preview Window ------------ */}
      {previewProduct && showPreviewProduct && (
        <div className="w-full sm:w-[401px] sm:min-w-[401px] flex flex-col h-auto fixed bottom-0 sm:top-0 sm:right-0 z-70 bg-white">
          <img
            onClick={() => setShowPreviewProduct(false)}
            src={assets.cross_icon}
            alt="close"
            className="absolute top-10 sm:top-5 right-7 w-4 h-4 cursor-pointer z-80"
          />

          <div className="top-10 flex justify-between pl-4 mt-20 mb-4 sm:mb-0 sm:mt-10">
            <div className="details w-60 flex flex-col mt-2 gap-2">
              <span className="text-[15px]">{previewProduct.name}</span>
              <span className="text-[12px] text-gray-600">
                {currency}
                {previewProduct.originalPrice}
              </span>
            </div>
            <Link
              to={`/product/${previewProduct._id}`}
              className="w-25 mt-4 pr-3 sm:pr-0"
            >
              <span className="underline text-[12px]">View Details</span>
            </Link>
          </div>

          {/* images */}
          <div className="images my-4 w-[80] h-[60vh] object-cover overflow-x-auto mr-3 flex gap-[1px] hidden sm:flex">
            {previewProduct.image.map((item, index) => (
              <img
                src={item}
                alt="product_images"
                key={index}
                className="h-full"
              />
            ))}
          </div>

          {/* sizes */}
          <div className="flex flex-col gap-4 mt-3 pl-3 mb-2 sm:mt-5 sm:pl-4">
            <p>Avaliable Size</p>
            <div className="flex flex-wrap gap-2">
              {previewProduct.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`bg-black text-white px-5 sm:px-4 py-2.5 sm:py-1.5 rounded-md border text-sm font-medium transition-colors`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="btns flex justify-center mt-2">
            <Link>
              <button className="bg-black text-white px-16 sm:px-30 py-4 sm:py-5 text-medium active:bg-gray-600 cursor-pointer rounded mt-8 sm:mt-0">
                Add to Cart
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="text-center text-3xl py-8">
        <Tittle text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
          ipsum veritatis dolore. Aliquid similique debitis neque minima
          voluptatibus! Reprehenderit assumenda tempora accusantium ipsa
          molestias officiis incidunt quisquam minus repellat aut.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((product, index) => (
          <ProductItem
            key={index}
            id={product._id}
            image={product.image}
            name={product.name}
            discountPercentage={product.discountPercentage}
            setShowPreviewProduct={setShowPreviewProduct}
            setPreviewProduct={setPreviewProduct}
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

      <OurPolicies />
    </div>
  );
};

export default BestSeller;
