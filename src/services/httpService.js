import axios from "axios";
import { toast } from "react-toastify";

//intercepts response
axios.interceptors.response.use(null, (error) => {
  console.log("interceptor called");
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    return Promise.reject(error);
  }
  toast("unknown error");
  console.log(error);
  //promise is rejected and then control passes to catch
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
