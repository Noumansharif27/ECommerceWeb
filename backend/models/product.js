import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  originalPrice: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  salesPrice: { type: Number, required: true },
  image: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  bestSeller: {
    type: Boolean,
  },
  date: {
    type: Array,
    required: true,
  },
});

productSchema.pre("save", async function () {
  if (this.originalPrice && this.discountPercentage) {
    this.salesPrice =
      this.originalPrice - this.originalPrice * (this.discountPercentage / 100);
  } else {
    this.salesPrice = this.originalPrice;
  }
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
