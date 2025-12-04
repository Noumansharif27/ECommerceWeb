import mongoose from "mongoose";

const ConnectDB = async () => {
  const uri = process.env.DB_URL || process.env.MONGODBURL;

  if (!uri) {
    console.error(
      "No MongoDB connection string found in environment variables (DB_URL or MONGODBURL)."
    );
    return;
  }

  try {
    // UPDATED: Options removed because they are default in Mongoose v7+
    await mongoose.connect(uri);

    console.log("DB Connected!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message || err);
    // process is kept alive based on your previous logic
  }
};

export default ConnectDB;
