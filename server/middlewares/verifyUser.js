import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import asyncHandler from "./asyncHandler.js";
import UserModel from "../models/UserModel.js";

const verifyUser = asyncHandler(async (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    res.status(404);
    throw new Error("Login or register to access this route");
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (!verified) {
    res.status(401);
    throw new Error("Youre not authorised");
  }

  const user = await UserModel.findById(verified._id).select("-password -role");

  if (!user) {
    res.status(403);
    throw new Error("User not found");
  }

  req.user = user;
  req.role = verified.role;
  next();
});

export default verifyUser;
