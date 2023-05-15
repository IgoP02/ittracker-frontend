import { axiosReports, csrfAxios } from "../utils/axiosClients";

/**
 * 
 * @param {string} field 
 * @returns {Array} query results as array
 */
export default async function fetchField(field) {
        const response = await axiosReports(`/field/${field}`);
        const data = response.data;
        console.log("mapa",data)
        return data;


    }

