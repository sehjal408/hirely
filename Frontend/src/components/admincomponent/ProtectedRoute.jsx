import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user not logged in OR not a recruiter, redirect
    if (!user || user.role !== "Recruiter") {
      navigate("/");
    }
  }, [user, navigate]);

  // Prevent flashing page by returning nothing before redirect finishes
  if (!user || user.role !== "Recruiter") return null;

  return <>{children}</>;
};

export default ProtectedRoute;
