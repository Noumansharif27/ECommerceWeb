import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";

// App Config
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json({}));
app.use(cors());
connectDB();

// API end point
app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
