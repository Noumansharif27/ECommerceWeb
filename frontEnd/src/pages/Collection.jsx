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
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-60 transition-opacity duration-300"
          onClick={() => setShowPreviewProduct(false)}
        ></div>
      )}

      {/* product Preview Window */}
      <div>
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

        {/* FilterOptions */}
        <div className="min-w-60 hidden">
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <img
              src={assets.dropdown_icon}
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
              alt=""
            />
          </div>

          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${
              showFilter ? "" : "hidden"
            }`}
          >
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  name="category[men]"
                  id="men"
                  value={"Men"}
                  className="w-3"
                  onClick={categoryToggle}
                />
                Men
              </p>

              <p className="flex gap-2">
                <input
                  type="checkbox"
                  name="category[women]"
                  id="men"
                  value={"Women"}
                  className="w-3"
                  onClick={categoryToggle}
                />
                Women
              </p>

              <p className="flex gap-2">
                <input
                  type="checkbox"
                  name="category[kids]"
                  id="men"
                  value={"Kids"}
                  className="w-3"
                  onClick={categoryToggle}
                />
                Kids
              </p>
            </div>
          </div>

          {/* SubCategory Products */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${
              showFilter ? "" : "hidden"
            }`}
          >
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  name="type[Topwear]"
                  id="men"
                  value={"Topwear"}
                  className="w-3"
                  onClick={subCategoryToggle}
                />
                Topwear
              </p>

              <p className="flex gap-2">
                <input
                  type="checkbox"
                  name="type[Bottomwear]"
                  id="men"
                  value={"Bottomwear"}
                  className="w-3"
                  onClick={subCategoryToggle}
                />
                Bottomwear
              </p>

              <p className="flex gap-2">
                <input
                  type="checkbox"
                  name="category[Winterwear]"
                  id="men"
                  value={"Winterwear"}
                  className="w-3"
                  onClick={subCategoryToggle}
                />
                Winterwear
              </p>
            </div>
          </div>

          <div className="flex justify-between text-base sm:text-2xl mb-4 hidden">
            <Tittle text1={"ALL"} text2={"COLLECTIONS"} />
            {/* Product Sort */}
            <select
              name="priceFilter"
              id="priceFilter"
              className="border-2 border-gray-300 text-sm px-2"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="relavent">Sert by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
        </div>

        {/* RightSide */}
        <div className="flex-1">
          {/* Map Product */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px] px-5">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
