const errorMessages = {
  400: "No está autorizado para acceder a esta función o la misma no existe",
  422: "Algo está mal en su solicitud",
  429: "Demasiadas solicitudes, intente de nuevo en unos segundos",
  network: "El servidor no se encuentra disponible o hay un problema de red",
};

function getErrorMessages(response) {
  if (response >= 400 && response <= 420) {
    return errorMessages[400];
  } else if (typeof response === "number") {
    return errorMessages[Math.floor(response / 100) * 100];
  } else {
    return errorMessages.network;
  }
}

export default getErrorMessages;
