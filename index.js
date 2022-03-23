require("dotenv").config();
const express = require("express");
const cors = require("cors");
const catchError = require("./middlewares/error");

const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");

const Mongo = require("./config/db");
Mongo.conect();
const app = express();
app.use(express.json());
app.use("/kd/api/v0/user", userRouter);
app.use("/kd/api/v0/product", productRouter);
app.use("/kd/api/v0/category", categoryRouter);

app.use(catchError);
app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
