import axios from 'axios';
import { config } from '../config.js'

const urlServidor = config.urlResourceProveedores;
async function Buscar() {
    try {
        const res = await axios.get(urlServidor); 
        return res.data;
    }
    catch (error) {
        console.error('Error al buscar los proveedores:', error);
    }
}
async function BuscarPorId(IdProveedor) {
    try {
        const res = await axios.get(urlServidor); 
        return res.data.find((proveedor) => proveedor.IdProveedor === IdProveedor);
    } catch (error) {
        console.error('Error al buscar el proveedor:', error);
    }
}
async function Agregar(proveedor) {
    try {
        const res = await axios.post(urlServidor, proveedor);
        console.log('Proveedor agregado con éxito:', res.data);
    } catch (error) {
        console.error('Error al agregar el proveedor:', error);
    }
}

async function Modificar(proveedor) {
    try {

        const res = await axios.get(urlServidor);
        const proveedores = res.data;

        let proveedorEncontrado = proveedores.find((proveedorfind) => proveedorfind.IdProveedor === proveedor.IdProveedor);

        if (proveedorEncontrado) {
            const respuesta = await axios.put(`${urlServidor}/${proveedor.IdProveedor}`, proveedor);
            console.log('Proveedor modificado con éxito:', respuesta.data);
        } else {
            console.error('Proveedor no encontrado');
        }
    } catch (error) {
        console.error('Error al modificar el proveedor:', error);
    }
}
async function Eliminar(IdProveedor) {
    try {
        const response = await axios.delete(`${urlServidor}/${IdProveedor}`);
        console.log('Proveedor eliminado con éxito:', response.data);
    } catch (error) {
        console.error('Error al eliminar el proveedor:', error);
    }
}

export const ProveedoresService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};
