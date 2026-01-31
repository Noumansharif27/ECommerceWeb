import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.js";
import validateAndCleanSizes from "../utils/sizeValidator.js";
// Add product
const addProduct = async (req, res) => {
  try {
    // const {
    //   name,
    //   description,
    //   originalPrice,
    //   discountPercentage,
    //   gender,
    //   category,
    //   subCategory,
    //   sizes,
    //   bestSeller,
    //   quantity,
    // } = req.body;

    // const image1 = req.files.image1 && req.files.image1[0];
    // const image2 = req.files.image2 && req.files.image2[0];
    // const image3 = req.files.image3 && req.files.image3[0];
    // const image4 = req.files.image4 && req.files.image4[0];

    // const cleanedSizes = validateAndCleanSizes(sizes);

    // if (cleanedSizes.length === 0) {
    //   return res.json({
    //     success: false,
    //     message: "Please select at least one size",
    //   });
    // }

    // const images = [image1, image2, image3, image4].filter(
    //   (image) => image !== undefined
    // );

    // // uploading the images to cloudinary.
    // let imageUrl = await Promise.all(
    //   images.map(async (item) => {
    //     let result = await cloudinary.uploader.upload(item.path, {
    //       resource_type: "image",
    //       quality: "auto",
    //       fetch_format: "auto",
    //       timeout: 60000,
    //     });
    //     return result.secure_url;
    //   })
    // );

    // let productData = {
    //   name,
    //   description,
    //   category,
    //   subCategory,
    //   gender,
    //   originalPrice: Number(originalPrice),
    //   discountPercentage: Number(discountPercentage || 0),
    //   salesPrice: Number(originalPrice), // auto-corrected by pre-save hook
    //   bestSeller: bestSeller == "true" ? true : false, // converting string into boolean
    //   sizes: cleanedSizes,
    //   image: imageUrl,
    //   quantity: Number(quantity),
    //   date: Date.now(),
    // };

    // // Add this check inside addProduct AND updateProduct
    // if (Number(originalPrice) <= 0) {
    //   return res.json({
    //     success: false,
    //     message: "Price must be greater than zero",
    //   });
    // }

    // if (Number(discountPercentage) < 0 || Number(discountPercentage) > 100) {
    //   return res.json({
    //     success: false,
    //     message: "Discount must be between 0 and 100",
    //   });
    // }

    // if (Number(quantity) < 0) {
    //   return res.json({
    //     success: false,
    //     message: "Quantity must be be above 0",
    //   });
    // }

    // const isExist = await productModel.findOne({ name });
    // if (isExist) {
    //   return res.json({
    //     success: false,
    //     message: "Product with same name already exists!",
    //   });
    // }

    const products = [
      {
        name: "Classic Black T-Shirt",
        description: "Premium cotton black t-shirt with a regular fit.",
        originalPrice: 2000,
        discountPercentage: 10,
        salesPrice: 1800,
        image: ["black-tshirt-1.jpg", "black-tshirt-2.jpg"],
        category: "Clothing",
        subCategory: "T-Shirts",
        gender: "Unisex",
        sizes: ["S", "M", "L", "XL"],
        bestSeller: true,
        quantity: 50,
        date: [new Date()],
      },
      {
        name: "White Casual Shirt",
        description: "Slim fit white casual shirt for everyday wear.",
        originalPrice: 3500,
        discountPercentage: 15,
        salesPrice: 2975,
        image: ["white-shirt-1.jpg"],
        category: "Clothing",
        subCategory: "Shirts",
        gender: "Men",
        sizes: ["M", "L", "XL"],
        bestSeller: false,
        quantity: 30,
        date: [new Date()],
      },
      {
        name: "Blue Denim Jeans",
        description: "Stretchable blue denim jeans with modern fit.",
        originalPrice: 5000,
        discountPercentage: 12,
        salesPrice: 4400,
        image: ["blue-jeans-1.jpg"],
        category: "Clothing",
        subCategory: "Jeans",
        gender: "Men",
        sizes: ["30", "32", "34", "36"],
        bestSeller: true,
        quantity: 40,
        date: [new Date()],
      },
      {
        name: "Women Summer Dress",
        description: "Lightweight floral summer dress for women.",
        originalPrice: 4200,
        discountPercentage: 8,
        salesPrice: 3864,
        image: ["summer-dress-1.jpg"],
        category: "Clothing",
        subCategory: "Dresses",
        gender: "Women",
        sizes: ["S", "M", "L"],
        bestSeller: false,
        quantity: 25,
        date: [new Date()],
      },
      {
        name: "Running Sneakers",
        description: "Comfortable running sneakers with breathable mesh.",
        originalPrice: 8000,
        discountPercentage: 15,
        salesPrice: 6800,
        image: ["sneakers-1.jpg", "sneakers-2.jpg"],
        category: "Footwear",
        subCategory: "Shoes",
        gender: "Men",
        sizes: ["40", "41", "42", "43"],
        bestSeller: true,
        quantity: 60,
        date: [new Date()],
      },
      {
        name: "Women Flat Sandals",
        description: "Elegant flat sandals suitable for daily use.",
        originalPrice: 3000,
        discountPercentage: 10,
        salesPrice: 2700,
        image: ["sandals-1.jpg"],
        category: "Footwear",
        subCategory: "Sandals",
        gender: "Women",
        sizes: ["37", "38", "39", "40"],
        bestSeller: false,
        quantity: 45,
        date: [new Date()],
      },
      {
        name: "Leather Wallet",
        description: "Genuine leather wallet with multiple compartments.",
        originalPrice: 2500,
        discountPercentage: 5,
        salesPrice: 2375,
        image: ["wallet-1.jpg"],
        category: "Accessories",
        subCategory: "Wallets",
        gender: "Men",
        sizes: ["Standard"],
        bestSeller: true,
        quantity: 100,
        date: [new Date()],
      },
      {
        name: "Stylish Sunglasses",
        description: "UV protected stylish sunglasses.",
        originalPrice: 2200,
        discountPercentage: 12,
        salesPrice: 1936,
        image: ["sunglasses-1.jpg"],
        category: "Accessories",
        subCategory: "Sunglasses",
        gender: "Unisex",
        sizes: ["Standard"],
        bestSeller: false,
        quantity: 70,
        date: [new Date()],
      },
      {
        name: "Hooded Sweatshirt",
        description: "Warm hooded sweatshirt for winter season.",
        originalPrice: 4500,
        discountPercentage: 15,
        salesPrice: 3825,
        image: ["hoodie-1.jpg"],
        category: "Clothing",
        subCategory: "Hoodies",
        gender: "Unisex",
        sizes: ["M", "L", "XL"],
        bestSeller: true,
        quantity: 35,
        date: [new Date()],
      },
      {
        name: "Sports Cap",
        description: "Adjustable sports cap with breathable fabric.",
        originalPrice: 1500,
        discountPercentage: 7,
        salesPrice: 1395,
        image: ["cap-1.jpg"],
        category: "Accessories",
        subCategory: "Caps",
        gender: "Unisex",
        sizes: ["Standard"],
        bestSeller: false,
        quantity: 90,
        date: [new Date()],
      },
    ];

    const newProducts = productModel.insertMany(products);

    // const product = new productModel({ ...productData });
    // const savedProduct = await product.save();
    // console.log(savedProduct);

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
