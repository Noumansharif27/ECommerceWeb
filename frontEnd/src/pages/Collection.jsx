import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Tittle from "../components/Tittle";
import ProductItem from "../components/ProductItem";
import { Link } from "react-router-dom";

const Collection = () => {
  const { products, currency } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const { search, showSearch } = useContext(ShopContext);

  const [previewProduct, setPreviewProduct] = useState(null);
  const [showPreviewProduct, setShowPreviewProduct] = useState(false);
  const [size, setSize] = useState("");

  console.log(previewProduct);
  let categoryToggle = (event) => {
    if (category.includes(event.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== event.target.value));
    } else {
      setCategory((prev) => [...prev, event.target.value]);
    }
  };

  let subCategoryToggle = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilters = () => {
    let productsCopy = products.slice();

    if (search && showSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilters();
        break;
    }
  };

  useEffect(() => {
    applyFilters();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <>
      {/* ----- Dark Overlay----- */}
      {showPreviewProduct && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-60 transition-opacity duration-300 cursor-pointer"
          onClick={() => setShowPreviewProduct(false)}
        ></div>
      )}

      <div className="h-auto px-6">
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

        {/* collection Name */}
        <div className="w-full flex items-center justify-center py-6 sm:py-12 border-b border-gray-100">
          <h2 className="text-3xl sm:text-5xl">Winter 2025</h2>
        </div>

        {/* FilterOptions */}
        <div className="sm:w-full hidden sm:flex justify-between sm:mt-8 sm:mb-10 items-center">
          <div className="flex gap-5">
            <p className="text-[12px]">104 Items</p>
            <p className="text-[12px]">FILTER & SORT</p>
          </div>
          <div className="flex gap-8">
            <div className="gender flex gap-2 text-gray-300 mt-2">
              <p className="text-[13px]">MEN</p>
              <p className="text-[13px]">WOMEN</p>
            </div>
            <div className="sizes flex items-start">
              <span className="border border-gray-100 px-5 py-2 hover:border-black">
                M
              </span>
              <span className="border border-gray-100 px-5 py-2 hover:border-black">
                L
              </span>
              <span className="border border-gray-100 px-5 py-2 hover:border-black">
                XL
              </span>
              <span className="border border-gray-100 px-5 py-2 hover:border-black">
                XXL
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <img
              src={assets.eight_box}
              className="opacity-25 w-5 h-5 hover:opacity-100"
              alt=""
            />
            <img
              src={assets.four_box}
              className="opacity-25 w-5 h-5 hover:opacity-100"
              alt=""
            />
          </div>
        </div>

        {/* RightSide */}
        <div className="flex-1">
          {/* Map Product */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[2px]">
            {filterProducts.map((product, index) => (
              <ProductItem
                key={index}
                name={product.name}
                id={product._id}
                discountPercentage={product.discountPercentage}
                setPreviewProduct={setPreviewProduct}
                setShowPreviewProduct={setShowPreviewProduct}
                price={
                  <div className="flex gap-1 items-senter justify-start">
                    {/* Original Price */}

                    {product.discountPercentage > 0 &&
                      product.originalPrice && (
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
                      {product.salesPrice
                        ? product.salesPrice.toFixed(2)
                        : "0.00"}
                    </p>
                  </div>
                }
                image={product.image}
              />
            ))}

            {filterProducts.map((product, index) => (
              <ProductItem
                key={index}
                name={product.name}
                id={product._id}
                discountPercentage={product.discountPercentage}
                setPreviewProduct={setPreviewProduct}
                setShowPreviewProduct={setShowPreviewProduct}
                price={
                  <div className="flex gap-1 items-senter justify-start">
                    {/* Original Price */}

                    {product.discountPercentage > 0 &&
                      product.originalPrice && (
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
                      {product.salesPrice
                        ? product.salesPrice.toFixed(2)
                        : "0.00"}
                    </p>
                  </div>
                }
                image={product.image}
              />
            ))}

            {filterProducts.map((product, index) => (
              <ProductItem
                key={index}
                name={product.name}
                id={product._id}
                discountPercentage={product.discountPercentage}
                setPreviewProduct={setPreviewProduct}
                setShowPreviewProduct={setShowPreviewProduct}
                price={
                  <div className="flex gap-1 items-senter justify-start">
                    {/* Original Price */}

                    {product.discountPercentage > 0 &&
                      product.originalPrice && (
                        <p className="text-gray-400 line-through text-sm">
                          {currency}
                          {product.originalPrice.toFixed(2)}
                        </p>
                      )}

                    {/* Sales Price */}
                    <p
                      className={`text-[12px] ${
                        product.discountPercentage > 0
                          ? "text-green-600"
                          : "text-black"
                      }`}
                    >
                      {currency}
                      {product.salesPrice
                        ? product.salesPrice.toFixed(2)
                        : "0.00"}
                    </p>
                  </div>
                }
                image={product.image}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
