import React, { useState, useEffect } from "react";
import { GimnasiosMockService } from "../services/gimnasios-mock.services";
function Gimnasios() {
  const tituloPagina = "Gimnasios";
  const [gimnasios, setGimnasios] = useState(null);
  useEffect(() => {
    BuscarArticulosFamilas();
  }, []);
  async function BuscarArticulosFamilas() {
    let data = await GimnasiosMockService.Buscar();
    setGimnasios(data);
  }
  return (
    <div>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "33%" }}>IdGimnasio</th>
            <th style={{ width: "33%" }}>Nombre</th>
            <th style={{ width: "33%" }}>FechaAlta</th>
          </tr>
        </thead>
        <tbody>
          {gimnasios &&
            gimnasios.map((gimnasios) => (
              <tr key={gimnasios.IdGimnasio}>
                <td>{gimnasios.IdGimnasio}</td>
                <td>{gimnasios.Nombre}</td>
                <td>{gimnasios.FechaAlta}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export { Gimnasios };
