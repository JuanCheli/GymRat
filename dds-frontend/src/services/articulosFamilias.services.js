import axios from "axios";
const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2024/api/articulosfamilias";
async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}
export const articulosFamiliasService = {
  Buscar
};
