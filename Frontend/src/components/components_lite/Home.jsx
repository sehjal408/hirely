import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import { useJobs } from "@/context/JobContext";
import { useAuth } from "@/context/AuthContext";
import useFetchJobs from "@/hooks/useFetchJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // 👇 Custom hook to fetch jobs using JobContext
  const { loading, error } = useFetchJobs(); 

  // 👇 Get data from JobContext instead of Redux
  const { allJobs } = useJobs();

  // 👇 Get user from AuthContext
  const { user } = useAuth();

  const navigate = useNavigate();

  // Auto-redirect recruiters
  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [user]);

  return (
    <div>
      <Navbar />
      <Header />
      <Categories />

      {loading && <p>Loading jobs...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <LatestJobs jobs={allJobs} />}

      <Footer />
    </div>
  );
};

export default Home;
