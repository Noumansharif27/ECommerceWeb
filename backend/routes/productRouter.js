import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
  editProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import adminActionsLimiter from "../middleware/adminActionsLimiter.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", adminAuth, adminActionsLimiter, removeProduct);
productRouter.get("/list", listProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/:productId", adminAuth, adminActionsLimiter, editProduct);
productRouter.post(
  "/:productId/update",
  adminAuth,
  adminActionsLimiter,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);

export default productRouter;
