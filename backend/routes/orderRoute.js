import express from "express";
import {
  placeOrderCod,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatue,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/auth.js";

const orderRoute = express.Router();

// Admin Features
orderRoute.post("/list", adminAuth, allOrders);
orderRoute.post("/status", adminAuth, updateStatue);

// Payment route
orderRoute.post("/place", userAuth, placeOrderCod);
orderRoute.post("/stripe", userAuth, placeOrderStripe);

// User Features
orderRoute.post("/userOrders", userAuth, userOrders);

export default orderRoute;
