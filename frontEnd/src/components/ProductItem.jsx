import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets";

const ProductItem = ({
  id,
  image,
  name,
  price,
  discountPercentage,
  setPreviewProduct,
  setShowPreviewProduct,
}) => {
  const { products } = useContext(ShopContext);

  const [isHovered, setIsHovered] = useState(false);
  // const [isDetailClicked, setIsDetailClick] = useState(false);

  const fetchDetailPreview = (e, id) => {
    e.preventDefault();
    try {
      const product = products.find((item) => id === item._id);
      if (product) {
        setPreviewProduct(product);
        setShowPreviewProduct(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-[400px] min-w-[314px] flex-shrink-0 h-auto product-card box-content"
      style={{ width: "314px", minWidth: "314px" }}
    >
      <Link
        className="text-gray-700 cursor-pointer relative"
        to={`/product/${id}`}
      >
        <div className="overflow-hidden relative mb-5">
          {discountPercentage > 0 && (
            <span className="absolute top-2 left-2 z-50 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          )}

          {/* detail_icon */}
          <div
            className="w-10 h-10 absolute bottom-2 right-2 z-50 flex justify-center items-center"
            onClick={(e) => fetchDetailPreview(e, id)}
          >
            <img
              src={assets.add_icon}
              alt="detail_icon"
              className="bg-slate-200 text-xs font-semibold rounded-full"
            />
          </div>
          <img
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full h-[30.263rem] object-cover hover:scale-110 transition ease-in-out"
            src={isHovered ? image[1] : image[0]}
            alt="ProductImage"
          />
        </div>
        <p className="pt-3 pb-1 text-sm ml-2">{name}</p>
        <p className="text-sm font-medium mb-5 ml-2">{price}</p>
      </Link>
    </div>
  );
};

export default ProductItem;
