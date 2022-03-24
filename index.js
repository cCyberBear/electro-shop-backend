require("dotenv").config();
const express = require("express");
const cors = require("cors");
const catchError = require("./middlewares/error");

const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const Mongo = require("./config/db");
const path = require("path");

Mongo.conect();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/kd/api/v0/user", userRouter);
app.use("/kd/api/v0/product", productRouter);
app.use("/kd/api/v0/category", categoryRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(catchError);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
