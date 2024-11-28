import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3333";

console.log(baseURL, "baseURL");

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Ensure credentials (cookies, tokens) are sent with requests
});

export default axiosInstance;
