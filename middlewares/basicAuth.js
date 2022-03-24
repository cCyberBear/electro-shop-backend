const apiError = require("../utility/apiError");

exports.basicAuth = (req, res, next) => {
  const headToken = req.headers.authorization;
  if (!headToken) {
    throw new apiError(401, "Unauthoriezed");
  }
  const token = headToken.split(" ");

  const basicToken = new Buffer.from(
    process.env.BASIC_USER + ":" + process.env.BASIC_PASSWORD
  ).toString("base64");

  if (token[1] !== basicToken || token[0] !== "Basic") {
    throw new apiError(401, "Unauthoriezed");
  }
  next();
};
