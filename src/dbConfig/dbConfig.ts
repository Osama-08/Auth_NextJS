import mongoose from "mongoose";


export async function connectToDatabase() {
  try {
    const mongoUrl = process.env.MONGO_URI! || "mongodb+srv://Osama:Pakistan1234@cluster0.tr1czhb.mongodb.net/";
    await mongoose.connect(mongoUrl);
    const connection = mongoose.connection;
    connection.on("Connected", (err) => {
      console.error("MongoDB connected successfully", err);
    });
    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}