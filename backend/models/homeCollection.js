import mongoose from "mongoose";
const { Schema } = mongoose.Schema;
const homeCollectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // "Featured Products"
    },

    slug: {
      type: String,
      required: true,
      unique: true, // "featured", "eid-special"
    },

    type: {
      type: String,
      enum: ["tag", "auto"],
      required: true,
      // tag → uses collectionTags
      // auto → system logic (new arrivals, best sellers)
    },

    tag: {
      type: String, // used if type === "tag"
    },

    autoRule: {
      type: String,
      enum: ["new-arrivals", "best-sellers", "discounted"],
      // used if type === "auto"
    },

    showOnHome: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      required: true, // admin controlled
    },

    limit: {
      type: Number,
      default: 8, // products to show on home
    },
  },
  { timestamps: true }
);

const collectionModel =
  mongoose.models.CollectionModel ||
  mongoose.model("collection", homeCollectionSchema);

export default collectionModel;
