import axios from "axios";
import { getToken } from "./manageLogin";

const csrfAxios = axios.create({baseURL:"http://api.ittracker.test/sanctum/csrf-cookie"})

const axiosReports = axios.create({
    baseURL:"http://api.ittracker.test/api/reports",
    headers:{
        Authorization : `Bearer ${getToken()}`
    }
});

const axiosApi = axios.create({
    baseURL: "http://api.ittracker.test/api"

})

export {axiosReports,axiosApi,csrfAxios}