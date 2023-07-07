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
  console.log(Cookies.get("logged"));
  return Cookies.get("logged");
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
/*
 * Run all cookie clearing functions
 */
function logOut() {
  removeLogged();
  removeName();
  removeUserName();
  deleteToken();
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
  logOut,
};
