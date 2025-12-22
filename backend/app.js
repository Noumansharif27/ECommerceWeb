import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRoute.js";

// App Config
const app = express();
const PORT = process.env.SERVER_PORT || process.env.PORT || 3000;

// middlewares
app.use(express.json({}));
app.use(cors());

// Connect to Database
connectDB();
connectCloudinary();
app.use("/uploads", express.static("backend/uploads"));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

// API end point
app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server is running on port: " + PORT);
});
