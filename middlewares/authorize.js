const apiError = require("../utility/apiError");

exports.authorize =
  (...roles) =>
  (req, res, next) => {
    const roleUser = req.user.role;
    if (!roleUser || !roles.includes(roleUser)) {
      throw new apiError(403, "Access denied");
    }
    next();
  };
