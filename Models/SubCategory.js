const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubCategorytSchema = new Schema(
  {
    subName: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "This Sub-Category is already existed"],
    },
    category: {
      type: Schema.Types.ObjectId,
      required: [true, "category is required"],
      ref: "Category",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("SubCategory", SubCategorytSchema);
