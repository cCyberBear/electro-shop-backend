const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "This product is already existed"],
    },
    retailPrice: {
      type: Number,
      required: [true, "retailPrice is required"],
    },
    forSale: {
      type: Number,
    },
    subCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    quantity: {
      type: Number,
      default: 1000,
    },
    description: {
      type: String,
    },

    img: {
      type: String,
      required: [true, "img is required"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Product", ProductSchema);
