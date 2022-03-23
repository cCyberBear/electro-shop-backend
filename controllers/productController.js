const catchAsync = require("../middlewares/async");
const Product = require("../Models/Product");
const ApiError = require("../Utils/ApiError");

exports.createProduct = catchAsync(async (req, res) => {
  const { name, retailPrice, forSale, subCategory, quantity } = req.body;
  if (forSale > retailPrice) {
    throw new ApiError(400, "Please check again sale price");
  }
  const product = await Product.create({
    name,
    retailPrice,
    forSale,
    subCategory,
    quantity,
  });
  res.status(200).json({
    success: true,
    data: product,
  });
});
