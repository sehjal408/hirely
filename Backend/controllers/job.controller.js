import { Job } from "../models/job.model.js";

// POST a job (Recruiter Only)

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    // REQUIRED fields only
    if (!title || !description || !location || !companyId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields (title, description, location, company).",
      });
    }

    // SAFE defaults to avoid backend rejection
    const finalRequirements = requirements ? requirements.split(",") : [];
    const finalSalary = Number(salary) || 0;
    const finalExperience = Number(experience) || 0;
    const finalPosition = Number(position) || 1;

    const job = await Job.create({
      title,
      description,
      requirements: finalRequirements,
      salary: finalSalary,
      location,
      jobType: jobType || "Full-time",
      experienceLevel: finalExperience,
      position: finalPosition,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });

  } catch (error) {
    console.error("POST JOB ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// GET all jobs (Users)

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, jobs });

  } catch (error) {
    console.error("GET ALL JOBS ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// GET job by ID

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("applications");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({ success: true, job });

  } catch (error) {
    console.error("GET JOB BY ID ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// GET jobs created by recruiter
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, jobs });

  } catch (error) {
    console.error("GET ADMIN JOBS ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// UPDATE job

export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const updateData = {
      title,
      description,
      requirements: requirements ? requirements.split(",") : [],
      salary: Number(salary) || 0,
      location,
      jobType,
      experienceLevel: Number(experience) || 0,
      position: Number(position) || 1,
      company: companyId,
    };

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });

  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// DELETE job

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error) {
    console.error("DELETE JOB ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
