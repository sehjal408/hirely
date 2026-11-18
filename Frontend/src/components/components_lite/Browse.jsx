import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";

import { useJobs } from "@/context/JobContext";       // 🔥 using JobContext
import useGetAllJobs from "@/hooks/useGetAllJobs";    // 🔥 context-based hook

const Browse = () => {
  const { allJobs, setSearchQuery } = useJobs();      // 🔥 pulled from context

  useGetAllJobs(); // fetch jobs on load

  // Clear search when leaving the page
  useEffect(() => {
    return () => {
      setSearchQuery("");   // 🔥 replaces redux dispatch
    };
  }, []);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results {allJobs.length}
        </h1>

        {/* No jobs found */}
        {allJobs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No jobs found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJobs.map((job) => (
              <Job1 key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
