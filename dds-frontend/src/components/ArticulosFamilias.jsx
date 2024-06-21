import React, { useState, useEffect } from "react";
import { articulosFamiliasMockService } from "../services/articulosFamilias-mock.service";
function ArticulosFamilias() {
  const tituloPagina = "ArticulosFamilias";
  const [articulosFamilias, setArticulosFamilias] = useState(null);
  // cargar al montar el componente (solo una vez)
  useEffect(() => {
    BuscarArticulosFamilas();
  }, []);
  async function BuscarArticulosFamilas() {
    let data = await articulosFamiliasMockService.Buscar();
    setArticulosFamilias(data);
  }
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>IdArticuloFamilia</th>
            <th style={{ width: "60%" }}>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {articulosFamilias &&
            articulosFamilias.map((articulofamilia) => (
              <tr key={articulofamilia.IdArticuloFamilia}>
                <td>{articulofamilia.IdArticuloFamilia}</td>
                <td>{articulofamilia.Nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export { ArticulosFamilias };
