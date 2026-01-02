import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { Upload, Info, CheckCircle2, Layers, BadgePercent } from "lucide-react";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [gender, setGender] = useState("Men");

  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [salePrice, setSalePrice] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const calculatedPrice =
      originalPrice && discountPercentage
        ? originalPrice - (originalPrice * discountPercentage) / 100
        : originalPrice || 0;
    setSalePrice(Math.round(calculatedPrice));
  }, [originalPrice, discountPercentage]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (isUploading) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("originalPrice", Number(originalPrice));
      formData.append("discountPercentage", Number(discountPercentage));
      formData.append("salesPrice", Number(salePrice));
      formData.append("quantity", Number(quantity));
      formData.append("gender", gender);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setOriginalPrice("");
        setDiscountPercentage(0);
        setSizes([]);
        setQuantity("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Product
          </h1>
          <p className="text-gray-500">
            Add photos and details to list your item in the shop.
          </p>
        </header>

        <form
          onSubmit={onSubmitForm}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* LEFT COLUMN: Media and Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Upload Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <Upload size={18} className="text-blue-600" /> Product Images
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[image1, image2, image3, image4].map((img, i) => (
                  <label
                    key={i}
                    className="relative group cursor-pointer aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-400 transition-all flex items-center justify-center overflow-hidden"
                  >
                    {!img ? (
                      <div className="text-center p-2">
                        <Upload size={20} className="mx-auto text-gray-400" />
                        <span className="text-[10px] text-gray-500 mt-1 block">
                          Click to upload
                        </span>
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(img)}
                        className="w-full h-full object-cover"
                        alt="preview"
                      />
                    )}
                    <input
                      type="file"
                      hidden
                      id={`image${i + 1}`}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (i === 0) setImage1(file);
                        else if (i === 1) setImage2(file);
                        else if (i === 2) setImage3(file);
                        else setImage4(file);
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Basic Details Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-semibold mb-4 text-gray-800">
                General Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="e.g. Slim Fit Cotton Shirt"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  placeholder="Describe the materials, fit, and style..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <BadgePercent size={18} className="text-green-600" /> Pricing &
                Offer
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Original Price
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex flex-col justify-center">
                  <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                    Final Sale Price
                  </span>
                  <p className="text-xl font-bold text-blue-900">
                    $ {salePrice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Metadata */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
              <h3 className="font-semibold flex items-center gap-2 text-gray-800">
                <Layers size={18} className="text-blue-600" /> Organization
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inventory
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Total Stock"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category & Gender
                </label>
                <div className="space-y-3">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none"
                  >
                    <option value="Clothes">Clothes</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Perfum">Perfum</option>
                  </select>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white outline-none"
                  >
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes(size)
                            ? prev.filter((s) => s !== size)
                            : [...prev, size]
                        )
                      }
                      className={`px-3 py-1 rounded-md text-xs font-bold border transition-all ${
                        sizes.includes(size)
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-10 h-5 rounded-full relative transition-all ${
                      bestSeller ? "bg-green-500" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                        bestSeller ? "left-6" : "left-1"
                      }`}
                    />
                  </div>
                  <input
                    type="checkbox"
                    hidden
                    checked={bestSeller}
                    onChange={() => setBestSeller(!bestSeller)}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Mark as Bestseller
                  </span>
                </label>
              </div>
            </div>

            <button
              disabled={isUploading}
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
            >
              {isUploading ? (
                "Publishing..."
              ) : (
                <>
                  <CheckCircle2 size={20} /> Publish Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
