import { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_ENDPOINT, FAKE_JOBS_API } from "@/utils/data";
import { useJobs } from "@/context/JobContext";
import stripHtml from "@/utils/stripHtml";

const useGetAllJobs = () => {
  const { searchQuery, setAllJobs } = useJobs();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      setError(null);

      let realJobs = [];
      let fakeJobsFormatted = [];

      /** 1️⃣ FETCH USER-POSTED JOBS (NOW PUBLIC — NO AUTH REQUIRED) **/
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${searchQuery || ""}`
        );

        if (res.data.success) {
          realJobs = res.data.jobs.map((job) => ({
            ...job,
            title: stripHtml(job.title),
            description: stripHtml(job.description),
          }));
        }
      } catch (err) {
        console.error("Error fetching real jobs:", err);
      }

      /** 2️⃣ FETCH FAKE API JOBS — CLEAN HTML **/
      try {
        const fakeRes = await axios.get(FAKE_JOBS_API);
        let fakeJobs = fakeRes.data.jobs || [];

        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          fakeJobs = fakeJobs.filter(
            (job) =>
              stripHtml(job.title).toLowerCase().includes(q) ||
              stripHtml(job.company_name).toLowerCase().includes(q)
          );
        }

        fakeJobsFormatted = fakeJobs.map((job) => ({
          _id: `fake-${job.id}`,
          title: stripHtml(job.title),
          description: stripHtml(job.description || job.title),
          longDescription: stripHtml(job.description),
          content: stripHtml(job.content),
          position: 5,
          jobType: stripHtml(job.job_type || "Full-time"),
          salary: "N/A",
          location: stripHtml(job.candidate_required_location || "Remote"),
          createdAt: job.publication_date || new Date().toISOString(),
          company: {
            name: stripHtml(job.company_name),
            logo: job.company_logo || "",
          },
        }));
      } catch (err) {
        console.error("Error fetching fake jobs:", err);
        if (!realJobs.length) setError("Failed to fetch jobs.");
      }

      /** 3️⃣ COMBINE ALL JOBS **/
      const combined = [...realJobs, ...fakeJobsFormatted];
      setAllJobs(combined);

      setLoading(false);
    };

    fetchAllJobs();
  }, [searchQuery, setAllJobs]);

  return { loading, error };
};

export default useGetAllJobs;
