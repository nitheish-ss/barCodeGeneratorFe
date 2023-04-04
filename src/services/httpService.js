import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "./auth";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log(axios.defaults.baseURL)
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("An unexpected error occurred");
  }
  if (error.response.status === 401) {
    logout();
  }
  return Promise.reject(error);
});

const setJwt = (jwt) => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
};
