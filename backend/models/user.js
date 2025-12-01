const mongoose = require("mongoose");
const passportLocalMongoose =
  require("passport-local-mongoose").default ||
  require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartDate: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

// Use email as the username field for passport-local-mongoose
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
