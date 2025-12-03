const asyncWrap = require("../asyncWrap");
const { Product } = require("../models/product");

// Add product
module.exports.addProduct = asyncWrap(async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestSeller } =
    req.body;

  // Validate required fields
  if (!name || !description || !price || !category || !subCategory || !sizes) {
    return res.json({
      success: false,
      message:
        "Missing required fields: name, description, price, category, subCategory, sizes",
    });
  }

  // Get uploaded images
  const image1 = req.files?.image1?.[0];
  const image2 = req.files?.image2?.[0];
  const image3 = req.files?.image3?.[0];
  const image4 = req.files?.image4?.[0];

  // Validate at least one image is provided
  if (!image1) {
    return res.json({
      success: false,
      message: "At least image1 is required",
    });
  }

  // Build images array with image paths
  const images = [];
  if (image1) images.push(image1.filename);
  if (image2) images.push(image2.filename);
  if (image3) images.push(image3.filename);
  if (image4) images.push(image4.filename);

  // Parse sizes (if sent as string, convert to array)
  const parsedSizes = typeof sizes === "string" ? sizes.split(",") : sizes;

  // Create new product
  const newProduct = new Product({
    name,
    description,
    price: Number(price),
    image: images,
    category,
    subCategory,
    size: parsedSizes,
    bestSeller: bestSeller === "true" || bestSeller === true,
    date: [new Date()],
  });

  // Save to database
  const savedProduct = await newProduct.save();

  res.json({
    success: true,
    message: "Product added successfully",
    product: savedProduct,
  });
});

// List product
module.exports.listProduct = asyncWrap(async (req, res) => {
  const products = await Product.find();
  res.json({
    success: true,
    message: "Products retrieved successfully",
    products,
  });
});

// removing product
module.exports.removeProduct = asyncWrap(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({
      success: false,
      message: "Product ID is required",
    });
  }

  const result = await Product.findByIdAndDelete(id);

  if (!result) {
    return res.json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    message: "Product removed successfully",
  });
});

// Get single product info
module.exports.singleProductInfo = asyncWrap(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({
      success: false,
      message: "Product ID is required",
    });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    message: "Product retrieved successfully",
    product,
  });
});
