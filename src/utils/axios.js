import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3333";
const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
