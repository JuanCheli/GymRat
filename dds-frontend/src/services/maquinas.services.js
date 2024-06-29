import axios from "axios";
import { config } from "../config.js"
const urlResource = config.urlResourceMaquinas;

async function Buscar(Nombre, ConStock, Pagina) {
  const resp = await axios.get((urlResource), {params: Nombre, ConStock, Pagina});
  return resp.data;
}
async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdMaquina);
  return resp.data;
}
async function ActivarDesactivarStock(item) {
  await axios.delete(urlResource + "/" + item.IdMaquina);
}
async function Grabar(item) {
  if (item.IdMaquina === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdMaquina, item);
  }
}
export const MaquinasService = {
    Buscar,BuscarPorId,ActivarDesactivarStock,Grabar
};
