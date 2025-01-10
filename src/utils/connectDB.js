import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    // console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
  }
};

export default connectMongo;
