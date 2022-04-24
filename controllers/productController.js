const catchAsync = require("../middlewares/async");
const Product = require("../Models/Product");
const apiError = require("../utility/apiError");

exports.createProduct = catchAsync(async (req, res) => {
  const { name, retailPrice, forSale, subCategory, quantity, description } =
    req.body;

  const product = await Product.create({
    name,
    retailPrice,
    forSale,
    subCategory: JSON.parse(subCategory),
    quantity,
    description,
    img: req.file.filename,
  });
  if (!product) {
    res.status(400).json({
      success: false,
      data: "can not save",
    });
  }
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

exports.deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Product.deleteOne({ _id: id });
  const products = await Product.find({}).populate("subCategory", "subName");
  res.json({
    success: true,
    data: products,
  });
});
exports.updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { name, retailPrice, forSale, subCategory, quantity, description } =
    req.body;
  if (req.file) {
    await Product.findByIdAndUpdate(
      { _id: id },
      {
        name,
        retailPrice,
        forSale,
        subCategory: JSON.parse(subCategory),
        quantity,
        description,
        img: req.file.filename,
      },
      {
        new: true,
      }
    );
  } else {
    await Product.findByIdAndUpdate(
      { _id: id },
      {
        name,
        retailPrice,
        forSale,
        subCategory: JSON.parse(subCategory),
        quantity,
        description,
      },
      {
        new: true,
      }
    );
  }
  const products = await Product.find({}).populate("subCategory", "subName");
  res.json({
    success: true,
    data: products,
  });
});
