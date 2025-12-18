import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Tittle from "../components/Tittle";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const { search, showSearch } = useContext(ShopContext);

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
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* FilterOptions */}
      <div className="min-w-60">
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
      </div>
      {/* RightSide */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
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

        {/* Map Product */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((product, index) => (
            <ProductItem
              key={index}
              name={product.name}
              id={product._id}
              price={
                <div className="flex items-center gap-2 relative">
                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <span className="absolute -top-3 -left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      -{product.discountPercentage}%
                    </span>
                  )}

                  {/* Original Price */}
                  {product.discountPercentage > 0 && product.originalPrice && (
                    <p className="text-gray-400 line-through text-sm">
                      {product.originalPrice.toFixed(2)}
                    </p>
                  )}

                  {/* Sales Price */}
                  <p
                    className={`font-bold text-lg ${
                      product.discountPercentage > 0
                        ? "text-green-600"
                        : "text-black"
                    }`}
                  >
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
  );
};

export default Collection;
