import axios from "axios";

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

export default instance;
