const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      console.log(decoded);
      if (!req.user) {
        res.status(401);
        throw new Error("user not found");
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Token failed");
    }
  } else {
    res.status(401);
    throw new Error("No token");
  }
});

module.exports = { protect };
