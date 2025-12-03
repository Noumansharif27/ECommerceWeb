import mongoose from "mongoose";

const ConnectDB = async () => {
  mongoose.connection.on("connect", () => {
    console.log("DB Connected!");
  });

  await mongoose.connect(`${process.env.MONGODBURL}/sehra-e-khaas`);
};

export default ConnectDB;
