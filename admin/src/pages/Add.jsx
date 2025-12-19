import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

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

  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [salePrice, setSalePrice] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  // Live calculation of sale price
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

      // Append new price fields separately
      formData.append("originalPrice", Number(originalPrice));
      formData.append("discountPercentage", Number(discountPercentage));
      formData.append("salesPrice", Number(salePrice));
      formData.append("quantity", Number(quantity));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName("");
        setDescription("");
        setOriginalPrice("");
        setDiscountPercentage(0);
        setSalePrice("");
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("Topwear");
        setQuantity("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      {/* Image Upload */}
      <div className="flex flex-col w-full items-start gap-3">
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, i) => (
            <label key={i} htmlFor={`image${i + 1}`}>
              <img
                className="w-20 cursor-pointer"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt="UploadAreaIcon"
              />
              <input
                onChange={(e) => {
                  if (i === 0) setImage1(e.target.files[0]);
                  else if (i === 1) setImage2(e.target.files[0]);
                  else if (i === 2) setImage3(e.target.files[0]);
                  else setImage4(e.target.files[0]);
                }}
                type="file"
                id={`image${i + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name and Description */}
      <div className="w-full mt-2">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full mt-2">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category, Subcategory, Prices */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8 mt-2">
        <div>
          <p className="mb-2">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p className="mb-1">Original Price</p>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Rs 5000"
            className="px-3 py-1.5 w-full sm:w-[140px]"
            required
          />

          <p className="mb-1">Discount %</p>
          <input
            type="number"
            value={discountPercentage}
            min={0}
            max={100}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            placeholder="0"
            className="px-3 py-1.5 w-full sm:w-[140px]"
          />

          <p className="text-green-600 text-sm font-semibold">
            Sale Price: Rs {salePrice || 0}
          </p>

          <p className="mb-1 mt-2">Total Quantity</p>
          <input
            type="number"
            value={quantity}
            min={0}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 50"
            className="px-3 py-1.5 w-full sm:w-[140px]"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="mt-2">
        <p>Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-black text-white" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="mt-2 mb-2 flex gap-2">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      <button
        disabled={isUploading}
        className={`bg-black text-white w-28 py-3 mt-4 cursor-pointer active:bg-gray-800 active:scale-95 transition-all ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="submit"
      >
        {isUploading ? "Uploading..." : "Add"}
      </button>
    </form>
  );
};

export default Add;
