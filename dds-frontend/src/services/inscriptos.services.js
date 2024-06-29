import { config } from "../config";
import httpService from "./http.services";
import axios from "axios"

const urlResource = config.urlResourceInscriptos;
const urlGimnasios = config.urlResourceGimnasios;


async function Buscar() {
    const resp = await httpService.get(urlResource);
    return resp.data;
}

async function BuscarGimnasios() {
    try {
        const res = await axios.get(urlGimnasios); 
        return res.data;
    }
    catch (error) {
        console.error('Error al buscar los gimnasios:', error);
    }
  }


async function BuscarPorId(item) {
    const resp = await httpService.get(urlResource + "/" + item.IdInscripto);
    return resp.data;
}


async function ActivarDesactivar(item) {
    await httpService.delete(urlResource + "/" + item.IdInscripto);
}


async function Grabar(item) {
    if (item.IdInscripto === 0) {
        await httpService.post(urlResource, item);
    } else {
        await httpService.put(urlResource + "/" + item.IdInscripto, item);
    }
}


export const InscriptosService = {
    Buscar, BuscarPorId, ActivarDesactivar, Grabar, BuscarGimnasios
};
