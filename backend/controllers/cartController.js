import userModel from "../models/user.js";

// Add to cart
const addCart = async () => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update cart
const updateCart = async () => {};

// get user cart data
const getUserCart = async () => {};

export { addCart, updateCart, getUserCart };
