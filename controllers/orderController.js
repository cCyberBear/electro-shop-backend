const catchAsync = require("../middlewares/async");
const Order = require("../Models/Order");

exports.createOrder = catchAsync(async (req, res) => {
  const orderReq = req.body;
  const userId = req.user.id;
  const order = await Order.create({ items: orderReq, user: userId });
  res.status(200).json({
    success: true,
    order,
  });
});

exports.getAllOrder = catchAsync(async (req, res) => {
  const order = await Order.find({}).populate("items.product");
  res.status(200).json({
    success: true,
    order,
  });
});

exports.userGetThierOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const order = await Order.find({ user: userId }).populate("items.product");
  res.status(200).json({
    success: true,
    data: order,
  });
});
