import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance with default configurations
const http = axios.create({
  baseURL: "https://dern-phi.vercel.app",
  withCredentials: true,
});

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to unauthorized access (status 401)
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Get the refresh token from cookies
          const checkCookies = Cookies.get("USER_INFO");
          console.log(checkCookies);
          if (!checkCookies) {
            // If Cookies is not available, redirect to login
            redirectToLogin();
            console.log("Cookies not available");
            return Promise.reject(error);
          }

          // Attempt to refresh the access token
          const refreshResponse = await http.patch(
            `/auth/refresh_token/${checkCookies}`
          );
          const { accessToken } = refreshResponse.data;

          // Store the new access token in local storage
          localStorage.setItem("accessToken", accessToken);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return http(originalRequest);
        } catch (refreshError) {
          // If refresh token is invalid or refresh fails, redirect to login
          console.error("Error refreshing token:", refreshError);
          redirectToLogin();
          return Promise.reject(error);
        }
      } else if (
        error.response.status === 404 &&
        error.response.data.message === "User not found"
      ) {
        // If the user is not found, redirect to login
        console.error("User not found:", error.response.data.message);
        redirectToLogin();
        return Promise.reject(error);
      }
    }

    // For other types of errors, reject the promise
    return Promise.reject(error);
  }
);

// Function to redirect to login page
const redirectToLogin = () => {
  // Clear user-related data from storage
  localStorage.removeItem("accessToken");
  Cookies.remove("USER_INFO");
  // Redirect to login page
  window.location.href = "/login";
};

export default http;
