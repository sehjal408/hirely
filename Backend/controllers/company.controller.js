import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloud.js";

// REGISTER COMPANY
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(401).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(401).json({
        message: "Company already exists",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET ALL COMPANIES OF LOGGED-IN USER
export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

// GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error(error);
  }
};

// UPDATE COMPANY 
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location, logo } = req.body;

    let logoUrl = undefined;

    // Upload 
    if (logo) {
      const uploadResponse = await cloudinary.uploader.upload(logo, {
        folder: "company_logos",
      });

      logoUrl = uploadResponse.secure_url;
    }

    // Prepare update object
    const updateData = {
      name,
      description,
      website,
      location,
    };

    if (logoUrl) updateData.logo = logoUrl;

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
