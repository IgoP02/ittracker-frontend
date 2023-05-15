import Cookies from "js-cookie";

/**
 * Save token to cookie
 * @param token
 */
function setToken(token) {
    
    Cookies.set("auth_token",token);
    
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
    Cookies.remove("auth_token")
}
/**
 * Sets logged cookie
 */
function setLogged(){
    Cookies.set("logged",true);
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

export {setToken,getToken,deleteToken, setLogged, removeLogged, isLogged};