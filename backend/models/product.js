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
  gender: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "At least one size is required",
    },
  },
  bestSeller: {
    type: Boolean,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: false,
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
  this.inStock = this.quantity > 0;
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
