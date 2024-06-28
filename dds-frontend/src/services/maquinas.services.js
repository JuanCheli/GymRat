import axios from "axios";
const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2024/api/articulos";

async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
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
export const maquinasService = {
    Buscar,BuscarPorId,ActivarDesactivarStock,Grabar
};
