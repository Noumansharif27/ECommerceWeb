import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.js";
import validateAndCleanSizes from "../utils/sizeValidator.js";
// Add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      originalPrice,
      discountPercentage,
      gender,
      category,
      subCategory,
      sizes,
      bestSeller,
      quantity,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const cleanedSizes = validateAndCleanSizes(sizes);

    if (cleanedSizes.length === 0) {
      return res.json({
        success: false,
        message: "Please select at least one size",
      });
    }

    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined,
    );

    // uploading the images to cloudinary.
    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
          quality: "auto",
          fetch_format: "auto",
          timeout: 60000,
        });
        return result.secure_url;
      }),
    );

    let productData = {
      name,
      description,
      category,
      subCategory,
      gender,
      originalPrice: Number(originalPrice),
      discountPercentage: Number(discountPercentage || 0),
      salesPrice: Number(originalPrice), // auto-corrected by pre-save hook
      bestSeller: bestSeller == "true" ? true : false, // converting string into boolean
      sizes: cleanedSizes,
      image: imageUrl,
      quantity: Number(quantity),
      date: Date.now(),
    };

    // Add this check inside addProduct AND updateProduct
    if (Number(originalPrice) <= 0) {
      return res.json({
        success: false,
        message: "Price must be greater than zero",
      });
    }

    if (Number(discountPercentage) < 0 || Number(discountPercentage) > 100) {
      return res.json({
        success: false,
        message: "Discount must be between 0 and 100",
      });
    }

    if (Number(quantity) < 0) {
      return res.json({
        success: false,
        message: "Quantity must be be above 0",
      });
    }

    const isExist = await productModel.findOne({ name });
    if (isExist) {
      return res.json({
        success: false,
        message: "Product with same name already exists!",
      });
    }

    const product = new productModel({ ...productData });
    const savedProduct = await product.save();
    console.log(savedProduct);

    res.json({ success: true, message: "Product Added!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for listing product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove product
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.body._id);
    // Validate ID presence
    if (!req.body._id) {
      return res.json({ success: false, message: "Product ID is required" });
    }

    console.log(product);

    if (!product) {
      return res.json({ success: false, message: "Product not found!" });
    }

    res.json({ success: true, message: "Product removed!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    console.log(product);

    if (!product) {
      return res.json({ success: false, message: "Product not found!" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product Not Found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      description,
      originalPrice,
      discountPercentage,
      category,
      subCategory,
      gender,
      sizes,
      bestSeller,
      quantity,
    } = req.body;

    // Check wether the sizes were entered or not
    if (!sizes) {
      res.json({
        success: false,
        message: "Please select atleast 1 of the given sizes!",
      });
    }

    // Cloudinary Image URL
    const getPublicId = (url) => {
      try {
        // Example URL: https://res.cloudinary.com/.../v12345/sample_image.jpg
        const parts = url.split("/");
        const fileName = parts[parts.length - 1]; // "sample_image.jpg"
        return fileName.split(".")[0]; // "sample_image"
      } catch (error) {
        return null;
      }
    };

    // Size Validator
    const cleanedSizes = validateAndCleanSizes(sizes);

    if (cleanedSizes.length === 0) {
      return res.json({
        success: false,
        message: "Please select at least one size",
      });
    }

    // Add this check inside addProduct AND updateProduct
    if (Number(originalPrice) <= 0) {
      return res.json({
        success: false,
        message: "Price must be greater than zero",
      });
    }

    if (Number(discountPercentage) < 0 || Number(discountPercentage) > 100) {
      return res.json({
        success: false,
        message: "Discount must be between 0 and 100",
      });
    }
    // 1. Find the existing product to get current images
    const currentProduct = await productModel.findById(productId);
    if (!currentProduct) {
      return res.json({ success: false, message: "Product not found" });
    }

    // 2. Prepare to handle new images
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const newImages = [image1, image2, image3, image4];
    let updatedImageUrls = [...currentProduct.image]; // Start with existing images

    // 3. Loop through slots; if a new file is uploaded, delete the old one first
    for (let i = 0; i < newImages.length; i++) {
      if (newImages[i]) {
        const oldUrl = currentProduct.image[i];
        if (oldUrl) {
          const publicId = getPublicId(oldUrl);
          if (publicId) {
            // PERMANENTLY remove the old file from Cloudinary
            await cloudinary.uploader.destroy(publicId);
          }
        }

        // Upload the new file
        const result = await cloudinary.uploader.upload(newImages[i].path, {
          resource_type: "image",
        });
        updatedImageUrls[i] = result.secure_url;
      }
    }

    // Add this logic before saving to the database
    const sanitizedOriginalPrice = Math.max(0, Number(originalPrice)); // Prevents negative price
    const sanitizedDiscount = Math.min(
      100,
      Math.max(0, Number(discountPercentage)),
    ); // Force 0-100 range
    const sanitizedQuantity = Math.max(0, Number(quantity)); // Prevents negative stock

    // Calculate the final sale price safely
    const sanitizedSalesPrice = Math.round(
      sanitizedOriginalPrice -
        (sanitizedOriginalPrice * sanitizedDiscount) / 100,
    );

    // Basic cleanup of strings to remove potential script tags
    const sanitizedName = name.replace(/<[^>]*>?/gm, "").trim();
    const sanitizedDescription = description.replace(/<[^>]*>?/gm, "").trim();

    // 4. Construct updated data object
    const updatedData = {
      name: sanitizedName,
      description: sanitizedDescription,
      category,
      subCategory,
      gender,
      originalPrice: sanitizedOriginalPrice,
      discountPercentage: sanitizedDiscount,
      salesPrice: sanitizedSalesPrice,
      bestSeller: bestSeller === "true",
      sizes: cleanedSizes,
      image: updatedImageUrls,
      quantity: sanitizedQuantity,
    };

    await productModel.findByIdAndUpdate(productId, updatedData);
    console.log(updateProduct);
    res.json({ success: true, message: "Product Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
  editProduct,
  updateProduct,
};
