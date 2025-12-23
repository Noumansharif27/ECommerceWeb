import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useRef } from "react";

const LatestCollections = () => {
  const { products, currency } = useContext(ShopContext);

  let [latestProducts, setLatestProducts] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [showPreviewProduct, setShowPreviewProduct] = useState(false);
  const [size, setSize] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
    // console.log(products);
  }, [products]);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDragging.current = true;
    containerRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    containerRef.current.classList.remove("cursor-grabbing");
  };

  const onMouseUp = () => {
    isDragging.current = false;
    containerRef.current.classList.remove("cursor-grabbing");
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // scroll speed
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchStart = (e) => {
    startX.current = e.touches[0].pageX;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const onTouchMove = (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

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
        <div className="fixed top-0 right-0 z-70 w-[390px] min-w-[390px] max-w-[390px] box-border flex flex-col bg-white">
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
        {/* <div className="collection_icon absolute top-265 right-10">
          <img src={assets.right_arrow} alt="next" className="w-10 h-10" />
        </div> */}
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
      <div
        ref={containerRef}
        className="
        flex
        items-stretch
        gap-2
        flex-nowrap
        overflow-x-auto
        overflow-y-hidden
        hide-vertical-scroll
        cursor-grab
        select-none
        bg-green-500

        h-[22rem]
        sm:h-auto
      "
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {latestProducts.map((product, index) => (
          <ProductItem
            key={index}
            id={product._id}
            image={product.image}
            name={product.name}
            discountPercentage={product.discountPercentage}
            setShowPreviewProduct={setShowPreviewProduct}
            setPreviewProduct={setPreviewProduct}
            isLatestCollection={true}
            price={
              <div className="flex gap-1 items-senter justify-start mb-3">
                {/* Original Price */}

                {product.discountPercentage > 0 && product.originalPrice && (
                  <p className="text-gray-400 line-through text-[10px]">
                    {currency}
                    {product.originalPrice.toFixed(2)}
                  </p>
                )}

                {/* Sales Price */}
                <p
                  className={`text-md ${
                    product.discountPercentage > 0
                      ? "text-green-600"
                      : "text-gray-800"
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
