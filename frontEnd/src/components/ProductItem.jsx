import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const ProductItem = ({
  id,
  image,
  name,
  price,
  discountPercentage,
  setPreviewProduct,
  setShowPreviewProduct,
  isLatestCollection,
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

  // const location = useLocation();

  // Automatically true if we are on the collection page
  // const isCollectionPage = location.pathname === "/collection";

  const classes = `
  box-border
  flex-shrink-0
  h-full

  ${
    isLatestCollection
      ? `
        w-[200px]
        sm:w-auto
      `
      : "max-w-[400px] mx-auto"
  }
`;

  return (
    <div className={classes}>
      <Link
        className="text-gray-700 cursor-pointer relative h-full flex flex-col"
        to={`/product/${id}`}
      >
        <div
          className={`overflow-hidden relative ${
            isLatestCollection ? "mb-2" : "mb-5"
          }`}
        >
          {discountPercentage > 0 && (
            <span className="absolute top-2 left-2 z-50 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
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
              className="bg-red-200 text-xs font-semibold rounded-full"
            />
          </div>
          <img
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`w-full object-cover transition ease-in-out ${
              isLatestCollection
                ? "h-[18.5rem] sm:h-[30.263rem]"
                : "h-[30.263rem]"
            }`}
            src={isHovered ? image[1] : image[0]}
            alt="ProductImage"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 px-2">
          <p className={isLatestCollection ? "text-xs mt-1" : "text-sm pt-3"}>
            {name}
          </p>

          <p
            className={
              isLatestCollection ? "text-[10px] mb-2" : "text-[11px] mb-5"
            }
          >
            {price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
