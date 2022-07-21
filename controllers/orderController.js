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
  const order = await Order.find({}, {}, { sort: { createdAt: -1 } })
    .populate("items.product")
    .populate("user")
    .select("-user.password");
  res.status(200).json({
    success: true,
    data: order,
  });
});

exports.userGetThierOrder = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const order = await Order.find(
    { user: userId },
    {},
    { sort: { createdAt: -1 } }
  ).populate("items.product");
  res.status(200).json({
    success: true,
    data: order,
  });
});

exports.getTop = catchAsync(async (req, res) => {
  const orders = await Order.find({}).populate("items.product");
  let counter = [];
  orders.map((val) => {
    const item = val.items.map((vall) => counter.push(vall));
    return item;
  });
  const topItem = counter.reduce((acc, val) => {
    const idx = acc.findIndex((vall) => vall.product._id === val.product._id);
    if (idx === -1) {
      acc.push(val);
      return acc;
    } else {
      acc[idx].quantity += val.quantity;
      return acc;
    }
  }, []);

  const sorted = topItem.sort((a, b) => {
    return b.quantity - a.quantity;
  });

  let productsOnly = [];
  sorted.map((val) => productsOnly.push(val.product));

  res.status(200).json({
    success: true,
    data: productsOnly,
  });
});
