import { AxiosAdmin, csrfAxios } from "../utils/axiosClients";

/**
 *
 * @param {string} field
 * @returns {Array} query results as array
 */
export default async function fetchField(field) {
  const response = await AxiosAdmin(`/reports/field/${field}`);
  const data = await response.data;
  return data;
}
