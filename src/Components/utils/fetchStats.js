import { AxiosAdmin } from "./axiosClients";
/**
 * @abstract get stats from ittracker api using the provided field
 * @param string field department | status | type
 * @returns {object} response data
 */
export default async function fetchStats(field) {
  const { data } = await AxiosAdmin.get(`/reports/stats/${field}`);
  console.log(data);
  return await data;
}
