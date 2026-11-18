import { createContext, useContext, useState } from "react";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [singleCompany, setSingleCompany] = useState({});
  const [searchCompanyByText, setSearchCompanyByText] = useState("");

  return (
    <CompanyContext.Provider
      value={{
        companies,
        setCompanies,
        singleCompany,
        setSingleCompany,
        searchCompanyByText,
        setSearchCompanyByText,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
