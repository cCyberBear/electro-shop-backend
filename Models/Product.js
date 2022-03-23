const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [12, "Must be at least 3 characters"],
    unique: [true, "This product is already existed"],
  },
  retailPrice: {
    type: Number,
    required: [true, "retailPrice is required"],
  },
  forSale: {
    type: Number,
    required: [true, "forSale is required"],
  },
  subCategory: {
    type: String,
    required: [true, "type is required"],
  },
  quantity: {
    type: Number,
    default: 1000,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
