import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import ProductItem from "./ProductItem";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const RelatedPrduct = ({ category, subCategory }) => {
  const { products, currency } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [showPreviewProduct, setShowPreviewProduct] = useState(false);
  const [size, setSize] = useState("");

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
      {/* ----- Dark Overlay----- */}
      {showPreviewProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-60 transition-opacity duration-300"
          onClick={() => setShowPreviewProduct(false)}
        ></div>
      )}

      {/* -------------- Product Preview Window ------------ */}
      {previewProduct && showPreviewProduct && (
        <div className="!w-[401px] !min-w-[401px] flex flex-col h-auto fixed top-0 right-0 z-70 bg-white pb-5">
          <img
            onClick={() => setShowPreviewProduct(false)}
            src={assets.cross_icon}
            alt="cross_icon"
            className="right-0 w-5 h-5 my-3 ml-90 cursor-pointer"
          />
          <div className="top flex justify-between pl-4">
            <div className="details w-60 flex flex-col mt-2 gap-2">
              <span className="text-[15px]">{previewProduct.name}</span>
              <span className="text-[12px]">
                {currency}
                {previewProduct.originalPrice}
              </span>
            </div>
            <Link to={`/product/${previewProduct._id}`} className="w-25 mt-4">
              <span className="underline text-[12px]">View Details</span>
            </Link>
          </div>

          {/* images */}
          <div className="images my-4 w-[80] h-[60vh] object-cover overflow-x-auto mr-3 flex gap-[1px]">
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
          <div className="flex flex-col gap-4 mt-5 pl-4">
            <p>Avaliable Size</p>
            <div className="flex flex-wrap gap-2">
              {previewProduct.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`bg-black text-white px-4 py-1.5 rounded-md border text-sm font-medium transition-colors`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="btns flex justify-center mt-2">
            <Link>
              <button className="bg-black text-white px-35 py-5 text-medium active:bg-gray-600 cursor-pointer rounded">
                Add to Cart
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="text-center text-3xl py-2">
        <Tittle text1={"RELATED"} text2={"ITEM"} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 gap-y-6">
        {related.map((product, index) => (
          <ProductItem
            key={index}
            name={product.name}
            image={product.image}
            id={product._id}
            discountPercentage={product.discountPercentage}
            setPreviewProduct={setPreviewProduct}
            setShowPreviewProduct={setShowPreviewProduct}
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
