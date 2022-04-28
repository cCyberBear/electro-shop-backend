require("dotenv").config();
const express = require("express");
const cors = require("cors");
const catchError = require("./middlewares/error");

const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const orderRouter = require("./routes/orderRoute");
const path = require("path");
const Mongo = require("./config/db");

Mongo.conect();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to to to to to to");
});
app.use("/kd/api/v0/user", userRouter);
app.use("/kd/api/v0/product", productRouter);
app.use("/kd/api/v0/category", categoryRouter);
app.use("/kd/api/v0/order", orderRouter);
app.use("/image", express.static(path.join(__dirname, "image")));
app.get("/uploads/:filename", (req, res) => {
  const { filename } = req.params;
  const file = Mongo.gridfs.find({ filename }).toArray((err, files) => {
    if (!files || !files.length) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    Mongo.gridfs.openDownloadStreamByName(filename).pipe(res);
  });
});
app.use(catchError);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
