import axios from 'axios';
import { config } from '../config.js'

const urlServidor = config.urlResourceGimnasios;
async function Buscar() {
    try {
        const res = await axios.get(urlServidor); 
        return res.data;
    }
    catch (error) {
        console.error('Error al buscar los gimnasios:', error);
    }
}
async function BuscarPorId(IdGimnasio) {
    try {
        const res = await axios.get(urlServidor); 
        return res.data.find((gimnasio) => gimnasio.IdGimnasio === IdGimnasio);
    } catch (error) {
        console.error('Error al buscar el gimnasio:', error);
    }
}
async function Agregar(gimnasio) {
    try {
        const res = await axios.post(urlServidor, gimnasio);
        console.log('Gimnasio agregado con éxito:', res.data);
    } catch (error) {
        console.error('Error al agregar el gimnasio:', error);
    }
}

async function Modificar(gimnasio) {
    try {

        const res = await axios.get(urlServidor);
        const gimnasios = res.data;

        let gimnasioEncontrado = gimnasios.find((gimnasiofind) => gimnasiofind.IdGimnasio === gimnasio.IdGimnasio);

        if (gimnasioEncontrado) {
            const respuesta = await axios.put(`${urlServidor}/${gimnasio.IdGimnasio}`, gimnasio);
            console.log('Gimnasio modificado con éxito:', respuesta.data);
        } else {
            console.error('Gimnasio no encontrado');
        }
    } catch (error) {
        console.error('Error al modificar el gimnasio:', error);
    }
}
async function Eliminar(IdGimnasio) {
    try {
        const response = await axios.delete(`${urlServidor}/${IdGimnasio}`);
        console.log('Gimnasio eliminado con éxito:', response.data);
    } catch (error) {
        console.error('Error al eliminar el gimnasio:', error);
    }
}

export const GimnasiosService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};
