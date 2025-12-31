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
        <div className="sm:w-full hidden sm:flex justify-between sm:mt-8 sm:mb-5">
          <div className="flex gap-5">
            <p className="text-[12px]">104 Items</p>
            <p className="text-[12px]">FILTER & SORT</p>
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
          <div className="flex gap-8">
            <div className="gender flex gap-2 text-gray-300 mt-2">
              <p className="text-sm">MEN</p>
              <p className="text-sm">WOMEN</p>
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
          <div>right</div>
        </div>