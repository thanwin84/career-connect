import axios from 'axios';

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

customFetch.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default customFetch;
