import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useCompany } from "@/context/CompanyContext";

const PostJob = () => {
 const [input, setInput] = useState({
  title: "",
  description: "",
  requirements: "None",
  salary: "0",
  location: "",
  jobType: "Full-time",
  experience: "0",
  position: "1",
  companyId: "",
});


  const navigate = useNavigate();
  const { companies } = useCompany();
  const [loading, setLoading] = useState(false);

  // handle text inputs
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // dropdown handler for company selection
  const companyChangeHandler = (e) => {
    setInput({ ...input, companyId: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // 1️⃣ validate company
    if (!input.companyId) {
      toast.error("Please select a company");
      return;
    }

    // 2️⃣ validate required fields
    if (!input.title || !input.description || !input.location) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error posting job");
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
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter job title"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter job description"
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter job location"
              />
            </div>

            <div>
              <Label>Salary (LPA)</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="LPA"
              />
            </div>

            <div>
              <Label>Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Number of positions"
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="e.g. React, Node, Mongo"
              />
            </div>

            <div>
              <Label>Experience (years)</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="0-3"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Full-time / Part-time"
              />
            </div>

            {/* Company Dropdown */}
            <div>
              <Label>Select Company</Label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full"
                value={input.companyId}
                onChange={companyChangeHandler}
              >
                <option value="">-- Select Company --</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            {loading ? (
              <Button className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-black hover:bg-blue-600">
                Post Job
              </Button>
            )}
          </div>

          {companies.length === 0 && (
            <p className="text-sm font-bold my-3 text-center text-red-600">
              *Please register a company to post jobs.*
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
