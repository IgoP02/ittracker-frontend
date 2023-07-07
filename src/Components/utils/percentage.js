/**
 *
 * @param {Number} number Number to be compared with percentage
 * @param {Number} total Total number to be compared against
 * @returns {Number} Calculated percentage
 */

export default function percentage(num, total) {
  return Math.round((num / total) * 100);
}
