import Cookies from "js-cookie";

/**
 * Save token to cookie
 * @param token
 */
function setToken(token) {
  Cookies.set("auth_token", token);
}
/**
 * Get token from cookies
 * @returns {string} retreived token
 */
function getToken() {
  return Cookies.get("auth_token");
}
/**
 * Deletes currently set auth token
 */
function deleteToken() {
  Cookies.remove("auth_token");
}
/**
 * Sets logged cookie
 */
function setLogged() {
  Cookies.set("logged", true);
}
/**
 * Removes logged cookie
 */
function removeLogged() {
  Cookies.remove("logged");
}
/**
 * Checks if logged cookie if set
 * @returns {boolean}
 */
function isLogged() {
  return Cookies.get("logged") ? true : false;
}
/**
 * set username to cookies
 */
function setUserName(userName) {
  localStorage.setItem("user_name", userName);
}
/**
 * Gets username from cookies if set
 * @returns {string}
 */
function getUserName() {
  return localStorage.getItem("user_name");
}
/**
 * Removes name from cookies if set
 */
function removeUserName() {
  return localStorage.removeItem("user_name");
}

function getName() {
  return localStorage.getItem("name");
}
/**
 * Removes name from cookies if set
 */
function removeName() {
  return localStorage.removeItem("name");
}
/**
 * Sets name to cookies
 */
function setName(name) {
  localStorage.setItem("name", name);
}

export {
  setToken,
  getToken,
  deleteToken,
  setLogged,
  removeLogged,
  isLogged,
  getUserName,
  setUserName,
  removeUserName,
  setName,
  getName,
  removeName,
};
