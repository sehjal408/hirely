import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useJobs } from "@/context/JobContext";

const useGetAllAdminJobs = () => {
  const { setAllAdminJobs } = useJobs();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {
          withCredentials: true,
        });

        if (res.data.status) {
          setAllAdminJobs(res.data.jobs);
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAdminJobs();
  }, []);

  return { loading, error };
};

export default useGetAllAdminJobs;
