import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductItem = ({ id, image, name, price, discountPercentage }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
      <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
        <div className="overflow-hidden relative">
          {discountPercentage > 0 && (
            <span className="absolute top-2 left-2 z-50 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              -{discountPercentage}%
            </span>
          )}
          <img
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="hover:scale-110 transition ease-in-out"
            src={isHovered ? image[1] : image[0]}
            alt="ProductImage"
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">{price}</p>
      </Link>
    </div>
  );
};

export default ProductItem;
