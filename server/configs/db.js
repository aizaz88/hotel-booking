import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDB;
