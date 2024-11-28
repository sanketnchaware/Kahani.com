import axios from "axios";

// Use environment variable or default to localhost for local development
const baseURL =
  process.env.REACT_APP_BACKEND_URL || "https://kahani-com.onrender.com";

// Create an Axios instance with the base URL and credentials configuration
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Ensures cookies are sent with cross-origin requests
});

export default axiosInstance;
