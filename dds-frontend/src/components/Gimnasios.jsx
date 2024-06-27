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
    <section class="intro">
      <div class="gradient-custom-2 h-100">
        <div class="mask d-flex align-items-center h-100">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-12">
                <div class="table-responsive">
                  <div>
                    <div className="tituloPagina">{tituloPagina}</div>
                    <table class="table table-dark table-bordered mb-0">
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
