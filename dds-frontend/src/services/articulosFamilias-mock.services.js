import arrayArticuloFamilia from '../datos-mock/articulosfamilias-mock';
async function Buscar() {
    return arrayArticuloFamilia;
}
async function BuscarPorId(IdArticuloFamilia) {
    return arrayArticuloFamilia.find((articulofamilia) => articulofamilia.IdArticuloFamilia === IdArticuloFamilia);
}
async function Agregar(articuloFamilia) {
    articuloFamilia.IdArticuloFamilia = arrayArticuloFamilia.length + 1;  // simula autoincremental
    arrayArticuloFamilia.push(articuloFamilia);
}
async function Modificar(articuloFamilia) {
    let articuloFamiliaEncontrado = arrayArticuloFamilia.find((articulofamiliafind) => articulofamiliafind.IdArticuloFamilia === articuloFamilia.IdArticuloFamilia);
    if (articuloFamiliaEncontrado) {
        articuloFamiliaEncontrado.Nombre = articuloFamilia.Nombre;
    }
}
async function Eliminar(IdArticuloFamilia) {
    let articuloFamiliaEncontrado = arrayArticuloFamilia.find((articulofamiliafind) => articulofamiliafind.IdArticuloFamilia === IdArticuloFamilia);
    if (articuloFamiliaEncontrado) {
        arrayArticuloFamilia.splice(arrayArticuloFamilia.indexOf(articuloFamiliaEncontrado), 1);
    }
}
export const articulosFamiliasMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};
