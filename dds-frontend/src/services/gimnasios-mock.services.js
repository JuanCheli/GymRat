import arrayGimnasios from '../datos-mock/gimnasios-mock';
async function Buscar() {
    return arrayGimnasios;
}
async function BuscarPorId(IdGimnasio) {
    return arrayGimnasios.find((gimnasio) => gimnasio.IdGimnasio === IdGimnasio);
}
async function Agregar(gimnasio) {
    gimnasio.IdGimnasio = arrayGimnasios.length + 1; 
    arrayGimnasios.push(gimnasio);
}
async function Modificar(gimnasio) {
    let gimnasioEncontrado = arrayGimnasios.find((gimnasiofind) => gimnasiofind.IdGimnasio === gimnasio.IdGimnasio);
    if (gimnasioEncontrado) {
        gimnasioEncontrado.Nombre = gimnasio.Nombre;
    }
}
async function Eliminar(IdGimnasio) {
    let gimnasioEncontrado = arrayGimnasios.find((gimnasiofind) => gimnasiofind.IdGimnasio === IdGimnasio);
    if (gimnasioEncontrado) {
        arrayGimnasios.splice(arrayGimnasios.indexOf(gimnasioEncontrado), 1);
    }
}
export const GimnasiosMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};
