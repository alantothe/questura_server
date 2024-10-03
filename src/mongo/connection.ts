import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("returnOriginal", false);

const connectString = process.env.MONGO_URI;
if (!connectString) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose.connect(connectString).catch((err) => {
  console.error(err);
  console.log("Error connecting to Database", err);
});

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});

export default mongoose.connection;
