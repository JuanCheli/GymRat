import { config } from "../config";
import httpService from "./http.services";

const urlResource = config.urlResourceInscriptos;


async function Buscar() {
    const resp = await httpService.get(urlResource);
    return resp.data;
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
    Buscar, BuscarPorId, ActivarDesactivar, Grabar
};
