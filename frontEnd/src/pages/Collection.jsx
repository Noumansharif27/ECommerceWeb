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
  const [gender, setGender] = useState([]);
  const [category, setCategory] = useState([]);
  const [filterSize, setFilterSize] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const { search, showSearch } = useContext(ShopContext);

  const [previewProduct, setPreviewProduct] = useState(null);
  const [showPreviewProduct, setShowPreviewProduct] = useState(false);
  const [size, setSize] = useState("");

  const [gridMode, setGridMode] = useState("dense");
  // "dense" = more products
  // "wide" = fewer products

  // let subCategoryToggle = (e) => {
  //   if (subCategory.includes(e.target.value)) {
  //     setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
  //   } else {
  //     setSubCategory((prev) => [...prev, e.target.value]);
  //   }
  // };

  // Add these right after your useState declarations
  const toggleSize = (size) => {
    if (filterSize.includes(size)) {
      setFilterSize((prev) => prev.filter((item) => item !== size));
    } else {
      setFilterSize((prev) => [...prev, size]);
    }
  };

  const toggleGender = (selectedGender) => {
    if (gender.includes(selectedGender)) {
      setGender((prev) => prev.filter((item) => item !== selectedGender));
    } else {
      setGender((prev) => [...prev, selectedGender]);
    }
  };

  const applyFilters = () => {
    let productsCopy = products.slice();

    if (search && showSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (gender.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        // Ensure item.gender exists and matches the case of your state
        gender.includes(item.gender)
      );
    }

    if (filterSize.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.sizes?.some((s) => filterSize.includes(s))
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
  }, [category, subCategory, gender, search, showSearch, products, filterSize]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const gridClasses =
    gridMode === "dense"
      ? `
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
      `
      : `
        grid-cols-2
        sm:grid-cols-2
        lg:grid-cols-2
      `;

  return (
    <>
      {/* ----- Dark Overlay----- */}
      {showPreviewProduct ||
        (showFilter && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-60 transition-opacity duration-300 cursor-pointer"
            onClick={() => (setShowPreviewProduct(false), setShowFilter(false))}
          ></div>
        ))}

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
        <div className="w-full flex items-center justify-center py-6 sm:py-12 border-b border-gray-100 mb-2 sm:mb-0">
          <h2 className="text-3xl sm:text-5xl">Winter 2025</h2>
        </div>

        {/* FilterOptions */}
        <div className="sm:w-full flex justify-between sm:mt-8 sm:mb-10 items-center mb-3">
          <div className="flex gap-5">
            <p className="text-[12px]">{products.length} Items</p>
            <div
              onClick={() => setShowFilter(true)}
              className="gap-1 cursor-pointer hidden sm:flex"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="4"
                  width="14"
                  height="1.5"
                  rx="0.75"
                  fill="black"
                />
                <circle cx="5.5" cy="4.75" r="2.2" fill="black" />
                <circle cx="5.5" cy="4.75" r="0.8" fill="white" />

                <rect
                  x="2"
                  y="8.25"
                  width="14"
                  height="1.5"
                  rx="0.75"
                  fill="black"
                />
                <circle cx="12.5" cy="9" r="2.2" fill="black" />
                <circle cx="12.5" cy="9" r="0.8" fill="white" />

                <rect
                  x="2"
                  y="12.5"
                  width="14"
                  height="1.5"
                  rx="0.75"
                  fill="black"
                />
                <circle cx="8" cy="13.25" r="2.2" fill="black" />
                <circle cx="8" cy="13.25" r="0.8" fill="white" />
              </svg>
              <p className="text-sm">FILTER & SORT</p>
            </div>

            <span
              onClick={() => setShowFilter(!showFilter)}
              className="fixed bottom-15 left-1/2 -translate-x-1/2 text-sm bg-white z-70 py-2 px-4 sm:hidden cursor-pointer"
            >
              FILTER & SORT
            </span>
          </div>
          <div className="flex gap-8">
            <div className="gender flex gap-2 text-gray-300 cursor-pointer">
              <p
                onClick={() => toggleGender("Men")}
                className={`text-[13px] select-none cursor-pointer ${
                  gender.includes("Men")
                    ? "text-black font-bold"
                    : "text-gray-300"
                }`}
              >
                MEN
              </p>
              <p
                onClick={() => toggleGender("Women")}
                className={`text-[13px] select-none cursor-pointer ${
                  gender.includes("Women")
                    ? "text-black font-bold"
                    : "text-gray-300"
                }`}
              >
                WOMEN
              </p>
            </div>
            <div className="sizes flex items-start hidden sm:inline">
              {["M", "L", "XL", "XXL"].map((size) => (
                <span
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`border px-5 py-2 cursor-pointer select-none transition-all ${
                    filterSize.includes(size)
                      ? "border-black bg-gray-100 font-medium"
                      : "border-gray-300 text-gray-500"
                  } hover:border-black`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <svg
              onClick={() => setGridMode("dense")}
              class={`w-[18px] h-[18px] hidden sm:inline transition-colors duration-200 ${
                gridMode === "dense" ? "text-black" : "text-slate-200"
              }`}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="18" height="18" class="fill-current" />
              <rect x="5" y="0" width="1" height="18" fill="#FEFEFE" />
              <rect x="11" y="0" width="1" height="18" fill="#FEFEFE" />
              <rect x="0" y="5" width="18" height="1" fill="#FEFEFE" />
              <rect x="0" y="11" width="18" height="1" fill="#FEFEFE" />
            </svg>
            <svg
              onClick={() => setGridMode("wide")}
              class={`w-[18px] h-[18px] hidden sm:inline transition-colors duration-200 ${
                gridMode === "wide" ? "text-black" : "text-slate-200"
              }`}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="20" class="fill-current" />
              <path d="M9 0h1v20h-1zM0 9h20v1h-20z" fill="#FEFEFE" />
            </svg>

            {/* Small Screen dense and Wide */}
            <svg
              onClick={() => setGridMode("dense")}
              viewBox="0 0 18 18"
              class={`w-[18px] h-[18px] sm:hidden transition-colors cursor-pointer ${
                gridMode === "dense" ? "fill-black" : "fill-slate-200"
              }`}
            >
              <rect width="18" height="18" />
            </svg>
            <div
              onClick={() => setGridMode("wide")}
              class="gap-[1px] flex sm:hidden"
            >
              <svg
                onClick={() => setGridMode("wide")}
                viewBox="0 0 10 18"
                class={`w-[10px] h-[18px] transition-colors cursor-pointer
                  ${gridMode === "wide" ? "fill-black" : "fill-slate-200"}
                  `}
              >
                <rect width="10" height="18" />
              </svg>

              <svg
                onClick={() => setGridMode("wide")}
                viewBox="0 0 10 18"
                class={`w-[10px] h-[18px] transition-colors cursor-pointer
                  ${gridMode === "wide" ? "fill-black" : "fill-slate-200"}
                  `}
              >
                <rect width="10" height="18" />
              </svg>
            </div>
          </div>

          {showFilter && (
            <div className="filter-window fixed right-0 top-0 h-full w-[21.75rem] bg-white z-70">
              <div className="p-4 flex justify-between sm:mb-2 items-center border-b">
                <p>Filter</p>
                <img
                  onClick={() => setShowFilter(false)}
                  src={assets.cross_icon}
                  alt="crossIcon"
                  className="w-3 h-3 cursor-pointer"
                />
              </div>

              <div className="flex-1 flex flex-col mt-2">
                <div className="h-[4rem] border-b border-slate-200 p-4 flex justify-between">
                  <label htmlFor="price">Price</label>
                  <select name="price" id="price">
                    <option value="low to high">Price, Low To High</option>
                    <option value="high to low">Price, High To Low</option>
                  </select>
                </div>

                <div className="h-[4rem] border-b border-slate-200 p-4 flex justify-between">
                  <label htmlFor="stock-status">Avalibility</label>
                  <select name="stock-status" id="stock-status">
                    <option value="inStock">In Stock</option>
                    <option value="outOfStock">Out Of Stock</option>
                  </select>
                </div>

                <div className="h-[4rem] border-b border-slate-200 p-4 flex justify-between">
                  <label htmlFor="size">Size</label>
                  <select name="size" id="size">
                    <option value="XXS">XXS</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>

                <div className="h-[4rem] border-b border-slate-200 p-4 flex justify-between">
                  <label htmlFor="subCategory">Sub-Category</label>
                  <select name="subCategory" id="subCategory">
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                  </select>
                </div>

                <div className="h-[4rem] border-b border-slate-200 p-4 flex justify-between">
                  <label htmlFor="DiscountPercentage">
                    Discount Percentage
                  </label>
                  <select name="DiscountPercentage" id="DiscountPercentage">
                    <option value="25">25%</option>
                    <option value="50">50%</option>
                    <option value="75">75%</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setShowFilter(false)}
                className="absolute bottom-10 right-2 mx-4 px-32 py-3 bg-black text-white mt-60 cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* RightSide */}
        <div className="flex-1">
          {/* Map Product */}
          <div className={`grid ${gridClasses} gap-[2px]`}>
            {filterProducts.map((product, index) => (
              <ProductItem
                key={index}
                name={product.name}
                id={product._id}
                discountPercentage={product.discountPercentage}
                setPreviewProduct={setPreviewProduct}
                setShowPreviewProduct={setShowPreviewProduct}
                IsWideOrDense={gridMode}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
