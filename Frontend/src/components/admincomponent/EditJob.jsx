import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useCompany } from "@/context/CompanyContext";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { companies } = useCompany();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch job details
  const fetchJobDetails = async () => {
    try {
      const res = await axios.get(`${JOB_API_ENDPOINT}/get/${id}`, {
        withCredentials: true,
      });

      if (res.data.status) {
        const job = res.data.job;

        setInput({
          title: job.title,
          description: job.description,
          requirements: job.requirements,
          salary: job.salary,
          location: job.location,
          jobType: job.jobType,
          experience: job.experience,
          position: job.position,
          companyId: job.company?._id,
        });
      }
    } catch (error) {
      toast.error("Failed to load job details");
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.put(
        `${JOB_API_ENDPOINT}/update/${id}`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success || res.data.status) {
        toast.success("Job updated successfully!");
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message || "Error updating job");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-500 shadow-sm hover:shadow-xl rounded-lg"
        >
          <h2 className="text-xl font-bold mb-5">Edit Job</h2>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Experience (years)</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Company</Label>
              <select
                className="border p-2 w-full rounded"
                value={input.companyId}
                onChange={(e) => setInput({ ...input, companyId: e.target.value })}
              >
                <option value="">Select a Company</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center mt-5">
            {loading ? (
              <Button className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Update Job
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
