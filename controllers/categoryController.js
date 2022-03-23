const catchAsync = require("../middlewares/async");
const Category = require("../Models/Category");
const SubCategory = require("../Models/SubCategory");

exports.create = catchAsync(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.getAll = catchAsync(async (req, res) => {
  const categories = await Category.find();
  const subCategories = await SubCategory.find();

  const newCat = categories.map((cat) => {
    return {
      ...categories,
      subCategory: subCategories.filter(
        (sub) => sub.category.toString() === cat._id.toString()
      ),
    };
  });
  res.status(200).json({
    success: true,
    data: newCat,
  });
});

exports.createSub = catchAsync(async (req, res) => {
  const { subName, category } = req.body;
  const subCategory = await SubCategory.create({ subName, category });
  res.status(200).json({
    success: true,
    data: subCategory,
  });
});

exports.getAllSub = catchAsync(async (req, res) => {
  const subCategories = await SubCategory.find();
  res.status(200).json({
    success: true,
    data: subCategories,
  });
});
