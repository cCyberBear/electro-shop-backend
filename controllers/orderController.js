const catchAsync = require("../middlewares/async");
const Order = require("../Models/Order");
const apiError = require("../utility/apiError");

exports.createOrder = catchAsync(async (req, res) => {
  const orderReq = req.body; // this is an array
  const order = await Order.create({ items: orderReq });
  //   const order = await Order.create({ product, quantity });
  res.status(200).json({
    success: true,
    order,
  });
});

exports.getAllOrder = catchAsync(async (req, res) => {
  const order = await Order.find({}).populate("items.product").select("");
  res.status(200).json({
    success: true,
    order,
  });
});
