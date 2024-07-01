import React, { useState, useEffect } from "react";
import { InscriptosService } from "../../services/inscriptos.services";

function Inscriptos() {
  const tituloPagina = "Inscriptos (solo para gimnasios)";
  const [inscriptos, setInscriptos] = useState([]);
  const [gimnasios, setGimnasios] = useState([]);

  useEffect(() => {
    BuscarInscriptos();
    BuscarGimnasios();
  }, []);

  async function BuscarInscriptos() {
    try {
      const data = await InscriptosService.Buscar();
      setInscriptos(data);
    } catch (error) {
      console.log("¡Error! No se pudo buscar datos en el servidor.");
    }
  }

  async function BuscarGimnasios() {
    try {
      const data = await InscriptosService.BuscarGimnasios();
      setGimnasios(data);
    } catch (error) {
      console.log("¡Error! No se pudo buscar datos de gimnasios en el servidor.");
    }
  }

  function getNombreGimnasio(IdGimnasio) {
    if (!gimnasios || gimnasios.length === 0) return IdGimnasio;
    const gimnasio = gimnasios.find((g) => g.IdGimnasio === IdGimnasio);
    return gimnasio ? gimnasio.Nombre : IdGimnasio;
  }

  return (
    <>
      <section className="intro">
        <div className="tabla h-100">
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="table-responsive">
                    <div className="tituloPagina">{tituloPagina}</div>
                    <table className="table table-dark table-bordered mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: "25%" }}>IdInscripto</th>
                          <th style={{ width: "25%" }}>Nombre</th>
                          <th style={{ width: "25%" }}>FechaInscripcion</th>
                          <th style={{ width: "25%" }}>Gimnasio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inscriptos.map((inscripto) => (
                          <tr key={inscripto.IdInscripto}>
                            <td>{inscripto.IdInscripto}</td>
                            <td>{inscripto.Nombre}</td>
                            <td>{inscripto.FechaInscripcion}</td>
                            <td>{getNombreGimnasio(inscripto.IdGimnasio)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Inscriptos.NombreComponenteNoOfuscado = "Inscriptos";
export { Inscriptos };