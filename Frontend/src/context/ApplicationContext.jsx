import { createContext, useContext, useState } from "react";

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applicants, setApplicants] = useState([]);

  return (
    <ApplicationContext.Provider value={{ applicants, setApplicants }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => useContext(ApplicationContext);
