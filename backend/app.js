// requiring the .env file and using it once in production
if (process.env_NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { ConnectCloudinary } = require("./config/cloudinary.js");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const path = require("path");

const { ConnectDB } = require("./config/cloudinary.js");
const userRoute = require("./routes/userRoute.js");
const productRoute = require("./routes/productRoute.js");

const app = express();
const PORT = process.env.SERVER_PORT || 4000;
const dbUrl = process.env.DB_URL;

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 + 60 + 60 + 1000,
    maxAge: Date.now() + 12 + 60 + 60 + 1000,
    httpOnly: true,
  },
};

// temp
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session()); // Required so that passport should know how is accessing the web even after changing the tab
passport.use(new LocalStrategy(User.authenticate())); // Authenticating (login/signup) user

passport.serializeUser(User.serializeUser()); // storing user information or moving the in a session
passport.deserializeUser(User.deserializeUser());

// API endPoints
app.use("/users", userRoute);
app.use("/products", productRoute);

app.get("/", (req, res) => {
  res.send("Server is Started");
});

app.listen(PORT, () => {
  console.log(`App is Listening at PORT: ${PORT}`);
});
