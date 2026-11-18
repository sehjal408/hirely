import { useEffect, useState } from "react";
import axios from "axios";
import { useJobs } from "@/context/JobContext";
import { JOB_API_ENDPOINT } from "@/utils/data";

const useFetchJobs = () => {
  const { setAllJobs, searchQuery } = useJobs();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchQuery || ""}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setAllJobs(res.data.jobs);
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching jobs");
      }

      setLoading(false);
    };

    fetchJobs();
  }, [searchQuery]);

  return { loading, error };
};

export default useFetchJobs;
