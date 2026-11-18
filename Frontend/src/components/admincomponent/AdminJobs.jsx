import React, { useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import { Button } from "../ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useJobs } from "@/context/JobContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";

const AdminJobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { allAdminJobs, setAllAdminJobs } = useJobs();

  // Fetch recruiter's posted jobs
  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setAllAdminJobs(res.data.jobs);
        }
      } catch (error) {
        console.error("Error fetching admin jobs:", error);
        toast.error("Failed to fetch admin jobs");
      }
    };

    fetchAdminJobs();
  }, [setAllAdminJobs]);

  // Delete job
  const deleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_ENDPOINT}/delete/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Job deleted!");
        setAllAdminJobs((prev) => prev.filter((job) => job._id !== jobId));
      } else {
        toast.error(res.data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job");
    }
  };

  // Unauthorized protection
  if (!user || user.role !== "Recruiter") {
    return <p className="text-center mt-10 text-red-600">Unauthorized</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Your Job Posts</h1>

          {/* FIXED BUTTON ROUTE */}
          <Button onClick={() => navigate("/admin/jobs/create")}>
            + Post New Job
          </Button>
        </div>

        {/* If no jobs */}
        {allAdminJobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {allAdminJobs.map((job) => (
              <div
                key={job._id}
                className="border p-5 rounded-lg shadow hover:shadow-lg bg-white"
              >
                <h2 className="font-bold text-xl">{job.title}</h2>
                <p className="text-gray-600">{job.description}</p>

                <div className="mt-3 flex gap-2">
                  <span className="text-sm bg-purple-100 px-2 py-1 rounded">
                    {job.location}
                  </span>
                  <span className="text-sm bg-orange-100 px-2 py-1 rounded">
                    {job.jobType}
                  </span>
                  <span className="text-sm bg-blue-100 px-2 py-1 rounded">
                    {job.salary} LPA
                  </span>
                </div>

                <div className="flex justify-between mt-5">
                  <Link to={`/admin/jobs/edit/${job._id}`}>
                    <Button variant="outline">Edit</Button>
                  </Link>

                  <Button
                    variant="destructive"
                    onClick={() => deleteJob(job._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;
