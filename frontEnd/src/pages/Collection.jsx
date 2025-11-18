import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Tittle from "../components/Tittle";

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

        {/* Typeategories */}
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
                name="type[Topware]"
                id="men"
                value={"Men"}
                className="w-3"
              />
              Topware
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                name="type[bottomware]"
                id="men"
                value={"Women"}
                className="w-3"
              />
              Bottomware
            </p>

            <p className="flex gap-2">
              <input
                type="checkbox"
                name="category[Winterware]"
                id="men"
                value={"Kid"}
                className="w-3"
              />
              Winterware
            </p>
          </div>
        </div>
      </div>
      {/* RightSide */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Tittle text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
        </div>
      </div>
    </div>
  );
};

export default Collection;
