import axios from "axios";

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export default customFetch;
