import axios from "axios";
import { toast } from "react-hot-toast";

// create a base axios instance
const instance = axios.create({
  baseURL: "http://localhost:3000/api" /* backend base URL */,
});

// Intercept requests to include token in headers
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); /*Get token from localStorage */

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; /* Set Authorization header */
  }
  return config;
});

// When token is invalid/expired, Redirect on 401 Unauthorized
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
