const errorMessages = {
  400: "No está autorizado para acceder a esta función o la misma no existe",
  422: "Algo está mal en su solicitud",
  429: "Demasiadas solicitudes, intente de nuevo en unos segundos",
  500: "Algo está mal en su solicitud",
  network: "El servidor no se encuentra disponible o hay un problema de red",
};
/**
 * Returns a string containing a message corresponding to the provided code or message
 * @param {Number|String} response Status code or message to be used as key
 * @returns {String} Error message
 */
function getErrorMessages(response) {
  if (response >= 400 && response <= 420) {
    return errorMessages[400];
  } else if (typeof response === "number") {
    return errorMessages[response];
  } else {
    return errorMessages.network;
  }
}

export default getErrorMessages;
