import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL || "https://kahani-com.onrender.com";
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
