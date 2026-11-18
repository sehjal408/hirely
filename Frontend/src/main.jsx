import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";


import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import { CompanyProvider } from "./context/CompanyContext";
import { ApplicationProvider } from "./context/ApplicationContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CompanyProvider>
        <JobProvider>
          <ApplicationProvider>
            <App />
            <Toaster />
          </ApplicationProvider>
        </JobProvider>
      </CompanyProvider>
    </AuthProvider>
  </StrictMode>
);
