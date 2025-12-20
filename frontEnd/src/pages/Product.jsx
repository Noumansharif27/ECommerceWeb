import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import RelatedPrduct from "../components/RelatedPrduct.jsx";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap 12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full product-images">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                alt="productImages"
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:s-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>

        {/* Product-Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-ceter gap-1 mt-2">
            <img src={assets.star_icon} alt="StarIcon" />
            <img src={assets.star_icon} alt="StarIcon" />
            <img src={assets.star_icon} alt="StarIcon" />
            <img src={assets.star_icon} alt="StarIcon" />
            <img src={assets.star_dull_icon} alt="StarIcon" />
            <p className="pl-2">{122}</p>
          </div>
          {/* Price Section */}
          <div className="mt-5 flex items-center gap-3">
            <p className="font-bold text-2xl">
              {currency}
              {productData.salesPrice.toFixed(2)}
            </p>

            {productData.discountPercentage > 0 &&
              productData.originalPrice && (
                <p className="text-gray-400 line-through text-lg">
                  {currency}
                  {productData.originalPrice}
                </p>
              )}
          </div>
          {/* Discount tag */}
          {productData.discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded my-1">
              -{productData.discountPercentage}%
            </span>
          )}
          {/* Stock Status */}
          <p
            className={`text-sm font-semibold mt-2 ${
              productData.inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {productData.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 cursor-pointer ${
                    item == size ? `border-orange-500` : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-600 cursor-pointer"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5 border-gray-300" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is avaliable on this product.</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews [112]</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure,
            doloremque culpa architecto corrupti distinctio autem qui rem eius
            accusamus asperiores! Velit sint accusamus ducimus praesentium
            dolorem? Ipsa aperiam reiciendis magni distinctio rem alias!
            Similique, quisquam?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            iste ducimus porro tenetur doloremque. Molestias sit quis
            repellendus facere totam aspernatur, quaerat explicabo! Cumque rerum
            quisquam, error reiciendis eos necessitatibus fuga laudantium harum
            quo voluptate magni consequatur nulla quod adipisci esse ullam
            voluptas. Corrupti, ipsam.
          </p>
        </div>
      </div>

      <RelatedPrduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
