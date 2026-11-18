import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { motion } from "framer-motion";
import { useJobs } from "@/context/JobContext";

const Jobs = () => {
  const { allJobs, searchQuery } = useJobs();
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }

    const q = searchQuery.toLowerCase();

    const filtered = allJobs.filter((job) => {
      return (
        job.title?.toLowerCase().includes(q) ||
        job.description?.toLowerCase().includes(q) ||
        job.location?.toLowerCase().includes(q) ||
        job.experience?.toLowerCase().includes(q) ||
        job.salary?.toLowerCase().includes(q)
      );
    });

    setFilterJobs(filtered);
  }, [allJobs, searchQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
