import React, { useState, useEffect } from "react";
import { GimnasiosService } from "../../services/gimnasios.services";
function Gimnasios() {
  const tituloPagina = "Gimnasios";
  const [gimnasios, setGimnasios] = useState(null);
  useEffect(() => {
    BuscarArticulosFamilas();
  }, []);
  async function BuscarArticulosFamilas() {
    let data = await GimnasiosService.Buscar();
    setGimnasios(data);
  }
  return (
    <section className="intro">
      <div className="tabla h-100">
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="table-responsive">
                  <div>
                    <div className="tituloPagina">{tituloPagina}</div>
                    <table className="table table-dark table-bordered mb-0">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export { Gimnasios };
