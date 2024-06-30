import axios from "axios";
import { config } from "../config.js"
const urlResource = config.urlResourceMaquinas;

const urlGimnasios = config.urlResourceGimnasios
const urlProveedores = config.urlResourceProveedores

// MaquinasService
async function Buscar(Nombre, ConStock, _pagina) {
  const resp = await axios.get(urlResource, {
    params: {
      Nombre: Nombre,
      ConStock: ConStock,
      _pagina 
    }
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdMaquina);
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


async function BuscarProveedores() {
  try {
      const res = await axios.get(urlProveedores); 
      return res.data;
  }
  catch (error) {
      console.error('Error al buscar los proveedores:', error);
  }
}


async function ActivarDesactivarStock(item) {
  const updatedItem = { ...item, ConStock: !item.ConStock };

  try {
    const response = await axios.put(`${urlResource}/${item.IdMaquina}`, updatedItem);
    console.log("Stock actualizado:", response.data);
    
  } catch (error) {
    console.error("Error al actualizar el stock:", error);
  }
}

async function ActivarDesactivarMaquina(item) {
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
    Buscar,BuscarPorId,ActivarDesactivarStock,ActivarDesactivarMaquina,Grabar,BuscarGimnasios,BuscarProveedores
};
