import { AxiosAdmin } from "./axiosClients";
/**
 * @abstract get stats from ittracker api using the provided field
 * @param string field department | status | type
 * @returns {object} response data
 */
export default async function fetchStats(field) {
  try {
    const { data } = await AxiosAdmin.get(`/stats/${field}`);
    console.log(data);
    return await data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.message) {
      console.log(error.message);
    }
  }
}
