const catchAsync = require("../middlewares/async");
const Product = require("../Models/Product");
const apiError = require("../utility/apiError");

exports.createProduct = catchAsync(async (req, res) => {
  const { name, retailPrice, forSale, subCategory, quantity, description } =
    req.body;
  if (forSale > retailPrice) {
    throw new apiError(400, "Please check again sale price");
  }
  const product = await Product.create({
    name,
    retailPrice,
    forSale,
    subCategory: JSON.parse(subCategory),
    quantity,
    description,
    img: req.file.filename,
  });
  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.getAll = catchAsync(async (req, res) => {
  const products = await Product.find({}).populate("subCategory", "subName");
  res.status(200).json({
    success: true,
    products,
  });
});
