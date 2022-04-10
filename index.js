require("dotenv").config();
const express = require("express");
const cors = require("cors");
const catchError = require("./middlewares/error");

const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const orderRouter = require("./routes/orderRoute");

const Mongo = require("./config/db");
const path = require("path");

Mongo.conect();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("gâu gâu gâu, gâu gâu gâu gâu");
});
app.use("/kd/api/v0/user", userRouter);
app.use("/kd/api/v0/product", productRouter);
app.use("/kd/api/v0/category", categoryRouter);
app.use("/kd/api/v0/order", orderRouter);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
