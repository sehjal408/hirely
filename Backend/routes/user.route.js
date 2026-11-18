import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";

const router = express.Router();

// Registration (no multer needed)
router.route("/register").post(register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").post(logout);

// Update profile (no file upload)
router.route("/profile/update").post(authenticateToken, updateProfile);

export default router;
