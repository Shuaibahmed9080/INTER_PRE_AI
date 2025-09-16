import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // redirect to login if unauthorized
        window.location.href = "/";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again");
    }

    // ✅ always return the error so your component can handle it
    return Promise.reject(error);
  }
);

export default axiosInstance;

// import axios from "axios";
// import { BASE_URL} from "./apiPaths"

// const axiosInstance = axios.create({
//     baseURL : BASE_URL,
//     timeout: 80000,
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//     }
// });

// // Request Interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const accessToken = localStorage.getItem("token");
//         if(accessToken){
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error) =>{
//         return Promise.reject(error);
//     }
// );

// // Response Interceptor
// axiosInstance.interceptors.response.use(
//     (response) =>{
//         return response;
//     },
//     (error) => {
//         // Handle common errors globally
//         if(error.response) {
//             if(error.response.status === 401){
//                 // Redirect to login page
//                 window.location.href = "/";
//             }else if (error.response.status === 500){
//                 console.error("Server error. Please try again later.")
//             }
//         } else if (error.code === "ECONNABORTED"){
//                 console.error("Request timeout. Please try again");
//             return Promise.reject(error)
//         }
//     }
// );

// export default axiosInstance;