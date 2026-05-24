import mongoose from "mongoose";

export const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB_NAME || "PortfolioDB",
    serverSelectionTimeoutMS: 3000,
    connectTimeoutMS: 3000,
  });
};
