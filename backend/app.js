// requiring the .env file and using it once in production
if (process.env_NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { ConnectCloudinary } = require("./config/cloudinary.js");

const { ConnectDB } = require("./config/cloudinary.js");
const userRouter = require("./routes/userRoute.js");

const app = express();
const PORT = process.env.SERVER_PORT || 4000;
const dbUrl = process.env.DB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((ERR) => {
    console.log(ERR);
  });

async function main() {
  await mongoose.connect(dbUrl);
}
ConnectCloudinary();

// middleware
app.use(express.json()); // it will parse data into json
app.use(cors()); // it will help to access backend from any ID

// API endPoints
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Server is Started");
});

app.listen(PORT, () => {
  console.log(`App is Listening at PORT: ${PORT}`);
});
