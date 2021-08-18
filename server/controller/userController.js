import asyncHandler from "../middlewares/asyncHandler.js";
import UserModel from "../models/UserModel.js";
import createToken from "../utils/createToken.js";

const day = 1000 * 60 * 60 * 24;

// @desc - Register User
// @route - POST /api/user/register
// @access - Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(403);
    throw new Error("User with this email Already exists");
  }

  const insertedUser = await UserModel.create({
    name,
    email,
    password,
  });

  const token = createToken(insertedUser._id, insertedUser.role);

  res.cookie("jwt", token, { httpOnly: true, maxAge: day });

  res.status(200).json({
    _id: insertedUser._id,
    name: insertedUser.name,
    email: insertedUser.email,
  });
});

// @desc - User Login
// @route - POST /api/user/login
// @access - Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Entered email doesn't exist");
  }

  const auth = await user.comparePassword(password);

  if (!auth) {
    res.status(401);
    throw new Error("Entered password is incorrect");
  }

  const token = createToken(user._id, user.role);

  res.cookie("jwt", token, { maxAge: day, httpOnly: true });

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

// @desc - Logout User
// @route - GET /api/user/logout
// @access - Private
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1, httpOnly: true });

  res.status(200).json({
    success: true,
  });
});

// @desc - My profile
// @route - GET /api/user/profile
// @access - Private
export const profile = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).select("-password -role");
  res.status(200).json(user);
});

// @desc - Update my profile
// @route - GET /api/user/update-profile
// @access - Private
export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).select("-role");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.save();

  res.status(200).json({
    name: user.name,
    email: user.email,
  });
});

// @desc - get all users
// @route - GET /api/user/admin/users
// @access - Private/Admin

export const getAllusers = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
});
