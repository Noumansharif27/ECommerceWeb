import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, discountPercentage }) => {
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
            className="hover:scale-110 transition ease-in-out"
            src={image[0]}
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
