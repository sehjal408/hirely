import { createContext, useContext, useState } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [allAdminJobs, setAllAdminJobs] = useState([]);
  const [singleJob, setSingleJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);

  return (
    <JobContext.Provider
      value={{
        allJobs,
        setAllJobs,
        allAdminJobs,
        setAllAdminJobs,
        singleJob,
        setSingleJob,
        searchQuery,
        setSearchQuery,
        allAppliedJobs,
        setAllAppliedJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
