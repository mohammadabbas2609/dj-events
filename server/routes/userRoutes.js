import express from "express";
import {
  getAllusers,
  login,
  logout,
  profile,
  register,
  updateProfile,
} from "../controller/userController.js";
import verifyUser from "../middlewares/verifyUser.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyUser, profile);
router.put("/updateprofile", verifyUser, updateProfile);
router.get("/logout", verifyUser, logout);
router.get("/admin/users", getAllusers);

export default router;
