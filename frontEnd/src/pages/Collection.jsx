import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
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
              />
              Women
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                name="category[kid]"
                id="men"
                value={"Kid"}
                className="w-3"
              />
              Kid
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
