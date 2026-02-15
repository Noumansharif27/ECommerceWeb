import orderModel from "../models/orderModel.js";
import userModel from "../models/user.js";

// place order using COD
const placeOrderCod = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    console.log(orderData);

    const newOrder = await orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// place rder using Stripe
const placeOrderStripe = async (req, res) => {};

// All orders data for Admin
const allOrders = async (req, res) => {};

// user Order data for frontEnd
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// uppdate order status for admin
const updateStatue = async (req, res) => {};

export { placeOrderCod, placeOrderStripe, allOrders, userOrders, updateStatue };
