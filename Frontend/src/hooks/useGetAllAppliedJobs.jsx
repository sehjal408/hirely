import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useApplications } from "@/context/ApplicationContext";

const useGetAppliedJobs = () => {
  const { setApplicants } = useApplications();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setApplicants(res.data.application);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppliedJobs();
  }, []);

  return null;
};

export default useGetAppliedJobs;
