import axios from "axios";
import { getToken } from "./manageLogin";

const apiURL = import.meta.env.VITE_API_URL;

const csrfAxios = axios.create({ baseURL: `${apiURL}/sanctum/csrf-cookie` });

const AxiosAdmin = axios.create({
  baseURL: `${apiURL}/api/`,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    Accept: "Application/json",
  },
});

const axiosApi = axios.create({
  baseURL: `${apiURL}/api`,
});

export { AxiosAdmin, axiosApi, csrfAxios };
