const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorytSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: [true, "This category is already existed"],
  },
});

module.exports = mongoose.model("Category", CategorytSchema);
