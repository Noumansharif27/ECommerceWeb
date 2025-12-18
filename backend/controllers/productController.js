import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.js";
// Add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      originalPrice,
      discountPercentage,
      salesPrice,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
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
      })
    );

    let productData = {
      name,
      description,
      category,
      subCategory,
      originalPrice: Number(originalPrice),
      discountPercentage: Number(discountPercentage || 0),
      salesPrice: Number(originalPrice), // auto-corrected by pre-save hook
      bestSeller: bestSeller == "true" ? true : false, // converting string into boolean
      sizes: JSON.parse(sizes), // converting the sizes from string into array
      image: imageUrl,
      date: Date.now(),
    };

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

export { addProduct, listProduct, removeProduct, singleProduct };
