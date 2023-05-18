import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.NODE_ENV === "development" ? 0 : 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.groupCollapsed(
      `%c${response.config.method.toUpperCase()} - ${response.config.url}`,
      "color: #00A7F7; font-weight: bold;"
    );
    console.log(response);
    console.groupEnd();
    let result = response.data;
    if (result.success === true) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
