import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Edit = ({ token }) => {
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
  const [product, setProduct] = useState(null);

  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [salePrice, setSalePrice] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  // 1. Ensure this matches your Route path (e.g., :productId)
  const { productId } = useParams();

  // Get Product Data
  const getProductData = async () => {
    if (!productId || productId === "undefined") return;

    try {
      const response = await axios.get(
        `${backendUrl}/api/product/${productId}`
      );

      if (response.data.success) {
        const p = response.data.product;
        setProduct(p);

        // Map the product data to your form states
        setName(p.name);
        setDescription(p.description);
        setCategory(p.category);
        setSubCategory(p.subCategory);
        setOriginalPrice(p.originalPrice);
        setDiscountPercentage(p.discountPercentage);
        setQuantity(p.quantity);
        setGender(p.gender || "Men");
        setBestSeller(p.bestSeller);
        setSizes(p.sizes || []);

        // Note: For images, you usually display the existing URLs
        // since <input type="file"> cannot be programmatically filled.
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Error fetching product data");
    }
  };

  // Live calculation of sale price
  useEffect(() => {
    const calculatedPrice =
      originalPrice && discountPercentage
        ? originalPrice - (originalPrice * discountPercentage) / 100
        : originalPrice || 0;
    setSalePrice(Math.round(calculatedPrice));
  }, [originalPrice, discountPercentage]);

  // Change your useEffect to wait for the productId
  useEffect(() => {
    getProductData();
  }, [productId]); // Only run when productId is available

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
      formData.append("gender", gender);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // IMPORTANT: Add the productId so the backend knows which record to update
      formData.append("productId", productId);

      // Change the URL to an update endpoint (you'll need to create this in your router)
      const response = await axios.post(
        `${backendUrl}/api/product/${productId}/update`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product Updated Successfully");
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
    <form onSubmit={onSubmitForm}>
      {/* Image Upload */}
      <div className="flex flex-col w-full items-start gap-3">
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, i) => {
            // Logic:
            // 1. If 'img' exists, user just selected a new file (show Blob)
            // 2. Else if 'product.image[i]' exists, show current DB image
            // 3. Else show default upload placeholder
            const existingImg = product?.image?.[i];
            const displaySrc = img
              ? URL.createObjectURL(img)
              : existingImg
              ? existingImg
              : assets.upload_area;

            return (
              <label key={i} htmlFor={`image${i + 1}`}>
                <img
                  className="w-20 h-20 object-cover cursor-pointer border border-gray-300 rounded"
                  src={displaySrc}
                  alt="ProductPreview"
                />
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (i === 0) setImage1(file);
                    else if (i === 1) setImage2(file);
                    else if (i === 2) setImage3(file);
                    else setImage4(file);
                  }}
                  type="file"
                  id={`image${i + 1}`}
                  hidden
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Name and Description */}
      <div className="w-full mt-2">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border rounded-md"
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
          className="w-full max-w-[500px] px-3 py-2 border rounded-md"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category, Subcategory, Prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Clothes">Clothes</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
            <option value="Perfum">Perfum</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sub Category</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-1">
            Original Price
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Rs 5000"
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-black"
            required
          />
        </div>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Discount %</label>
          <input
            type="number"
            value={discountPercentage}
            min={0}
            max={100}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            placeholder="0"
            className="px-3 py-1.5 w-full sm:w-[140px] border rounded"
          />
        </div>

        <p className="text-green-600 text-medium font-semibold mt-7">
          Sale Price: Rs {salePrice || 0}
        </p>

        <div>
          <label className="block text-sm font-medium mb-1">
            Total Quantity
          </label>
          <input
            type="number"
            value={quantity}
            min={0}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 50"
            className="px-3 py-1.5 w-full sm:w-[140px] border rounded"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="mt-6">
        <p className="text-sm font-medium mb-2">Available Sizes</p>
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
              className={`px-4 py-1.5 rounded-md border text-sm font-medium transition-colors
          ${
            sizes.includes(size)
              ? "bg-black text-white"
              : "bg-white hover:bg-gray-100"
          }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="mt-6 mb-2 flex items-center gap-2">
        <input
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
          type="checkbox"
          id="bestseller"
          className="w-4 h-4 cursor-pointer"
        />
        <label
          htmlFor="bestseller"
          className="cursor-pointer text-sm font-medium"
        >
          Add to bestseller
        </label>
      </div>

      <button
        disabled={isUploading}
        className="mt-8 bg-black text-white px-10 py-3 rounded-md font-medium hover:bg-gray-900 active:scale-95 transition-all disabled:opacity-50"
        type="submit"
      >
        {isUploading ? "Uploading..." : "Update Product"}
      </button>
    </form>
  );
};

export default Edit;
