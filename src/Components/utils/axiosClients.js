import axios from "axios";
import { getToken } from "./manageLogin";

const csrfAxios = axios.create({ baseURL: "http://api.ittracker.test/sanctum/csrf-cookie" });

const AxiosAdmin = axios.create({
  baseURL: "http://api.ittracker.test/api/",
  headers: {
    Authorization: `Bearer ${getToken()}`,
    Accept: "Application/json",
  },
});

const axiosApi = axios.create({
  baseURL: "http://api.ittracker.test/api",
});

export { AxiosAdmin, axiosApi, csrfAxios };
