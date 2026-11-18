import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";

import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// Recruiter
router.post("/post", authenticateToken, postJob);
router.get("/getadminjobs", authenticateToken, getAdminJobs);
router.put("/update/:id", authenticateToken, updateJob);
router.delete("/delete/:id", authenticateToken, deleteJob);

// Users
router.get("/get", getAllJobs);
router.get("/get/:id", authenticateToken, getJobById);

export default router;
