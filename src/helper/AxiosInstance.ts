import axios, { AxiosInstance } from "axios";

const BASEURL = import.meta.env.VITE_REACT_APP_BASEURL;
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: false,
});

export default axiosInstance;
