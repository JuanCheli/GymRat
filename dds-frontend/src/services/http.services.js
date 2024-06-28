import axios from "axios";
import modalService from "./modalDialog.services";


const httpService = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});


httpService.interceptors.request.use(
  (request) => {
    modalService.BloquearPantalla(true);
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = "Bearer " + accessToken;
    }
    return request;
  },
  (error) => {
    console.log("error en axios request", error);
    return Promise.reject(error);
  }
);


httpService.interceptors.response.use(
  (response) => {
    modalService.BloquearPantalla(false);
    return response;
  },
  (error) => {
    console.log("error en axios response ", error);
    modalService.BloquearPantalla(false);

    if (error.response.status === 401) {
      error.message = "debe loguearse para acceder a esta funcionalidad";
    } else if (error.response.status === 403) {
      error.message = "usuario no autorizado para acceder a esta funcionalidad";
    } else {
      error.message =
        error?.response?.data?.message ??
        "Actualmente tenemos inconvenientes en el servidor, por favor intente más tarde";
    }
    modalService.Alert(error.message);

    return Promise.reject(error);

  }
);


export default httpService;
