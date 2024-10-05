import mongoose from "mongoose";

// mongoDB configuration
export const mongoDbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { autoIndex: true });
    console.log(`Connected to MongoDB`.bgGreen.bold);
  } catch (error) {
    console.log(`${error.message}`.bgRed.blue);
  }
};
