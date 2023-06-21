/**
 *
 * @param {String} str String to be capitalized
 * @returns {String} Capitalized string
 */
export default function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
