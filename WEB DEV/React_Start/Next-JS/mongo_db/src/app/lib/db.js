import mongoose from "mongoose";

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const connectionSrt =
  `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@ac-w0yijgd-shard-00-00.sw341yn.mongodb.net:27017,ac-w0yijgd-shard-00-01.sw341yn.mongodb.net:27017,ac-w0yijgd-shard-00-02.sw341yn.mongodb.net:27017/productDB?ssl=true&replicaSet=atlas-e4b1cd-shard-0&authSource=admin`;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(connectionSrt);
  console.log("MongoDB Connected");
}