import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  name: String,
  company: String,
  price: Number,
  category: String
});

export const Product =
  mongoose.models.products ||
  mongoose.model("products", productModel);