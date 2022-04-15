const catchAsync = require("../middlewares/async");
const Order = require("../Models/Order");
const Product = require("../Models/Product");
const apiError = require("../utility/apiError");

exports.createOrder = catchAsync(async (req, res) => {
  const shipping = 50;
  const orderReq = req.body;
  const userId = req.user.id;
  let products = await Product.find({});
  let price = 0;
  const computePrice = await Promise.all(
    orderReq.map(async (value) => {
      const id = value.product;
      const amount = value.quantity;
      const prods = products.filter((val) => val._id.equals(id));
      if (amount > prods[0].quantity) {
        throw new apiError(400, "Exceed the quantity in stock");
      }
      await Product.findByIdAndUpdate(id, {
        quantity: prods[0].quantity - amount,
      });
      const priceEach = prods.reduce((acc, val) => {
        return acc + val.retailPrice * amount;
      }, 0);
      price += priceEach;
      return price;
    })
  );
  const totalPrice = computePrice[computePrice.length - 1] + shipping;
  const order = await Order.create({
    items: orderReq,
    user: userId,
    total: totalPrice,
  });
  res.status(200).json({
    success: true,
    payload: order,
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
