const jsonwebtoken = require("jsonwebtoken");
const catchAsync = require("../middlewares/async");
const ApiError = require("../utils/apiError");
const User = require("../Models/User");
const bcryptjs = require("bcryptjs");

exports.register = catchAsync(async (req, res) => {
  const { username, email, password, role } = req.body;
  const user = await User.create({ username, email, password, role });
  const token = jsonwebtoken.sign(
    {
      email,
      username,
      role: user.role,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "2h",
    }
  );
  res.status(201).json({
    success: true,
    data: user,
    token,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const isExisted = await User.findOne({ email });
  if (!isExisted) {
    throw new ApiError(404, "email or password is incorrect");
  }
  const isMatch = bcryptjs.compareSync(password, isExisted.password);
  if (!isMatch) {
    throw new ApiError(404, "email or password is incorrect");
  }
  const token = jsonwebtoken.sign(
    {
      email: isExisted.email,
      username: isExisted.username,
      role: isExisted.role,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "2h",
    }
  );
  res.json({
    success: true,
    token,
  });
});
exports.me = catchAsync(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const data = jsonwebtoken.verify(token, process.env.JWT_KEY);
  res.json({
    success: true,
    user: data,
  });
});
exports.changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const email = req.user.email;
  const user = await User.findOne({ email });
  const isMatch = bcryptjs.compareSync(oldPassword, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Incorrect password");
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
  });
});
