import React, { useState, useEffect } from "react";
import { InscriptosService } from "../../services/inscriptos.services";

function Inscriptos() {
  const tituloPagina = "Inscriptos (solo para administradores)";
  const [inscriptos, setInscriptos] = useState(null);

  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarInscriptos();
  }, []);

  async function BuscarInscriptos() {
    try {
      let data = await InscriptosService.Buscar();
      setInscriptos(data);
    } catch (error) {
      console.log("¡Error! No se pudo buscar datos en el servidor.");
    }
  }

  return (
    <>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "25%" }}>IdInscripto</th>
            <th style={{ width: "25%" }}>Nombre</th>
            <th style={{ width: "25%" }}>FechaInscripcion</th>
            <th style={{ width: "25%" }}>Gimnasio</th>
          </tr>
        </thead>
        <tbody>
          {inscriptos &&
            inscriptos.map((inscriptos) => (
              <tr key={inscriptos.IdInscripto}>
                <td>{inscriptos.IdInscripto}</td>
                <td>{inscriptos.Nombre}</td>
                <td>{inscriptos.FechaInscripcion}</td>
                <td>{inscriptos.Gimnasio}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
Inscriptos.NombreComponenteNoOfuscado = "Inscriptos";
export { Inscriptos };
