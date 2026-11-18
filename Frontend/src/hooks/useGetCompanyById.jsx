import { COMPANY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useCompany } from "@/context/CompanyContext";

const useGetCompanyById = (companyId) => {
  const { setSingleCompany } = useCompany();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          {
            withCredentials: true,
          }
        );

        setSingleCompany(res.data.company);
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    if (companyId) {
      fetchSingleCompany();
    }
  }, [companyId]);
};

export default useGetCompanyById;
