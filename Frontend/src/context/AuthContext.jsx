import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Save user to local storage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Login
  const loginUser = async (email, password, role) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        { email, password, role },
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logoutUser = async () => {
    await axios.post(`${USER_API_ENDPOINT}/logout`, {}, { withCredentials: true });
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
