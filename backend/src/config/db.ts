import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("[DATABASE]: Connected to MongoDB.");
  } catch (err) {
    console.error("[ERROR] Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

const gracefulShutdown = async (): Promise<void> => {
  console.log("[DATABASE] Closing MongoDB connection...");

  try {
    await mongoose.connection.close();
    console.log("[DATABASE]: MongoDB connection closed.");
    process.exit(0);
  } catch (err) {
      console.error("[ERROR] Error closing MongoDB connection:", err);
    process.exit(1);
  }
};

export { connectDB, gracefulShutdown };
