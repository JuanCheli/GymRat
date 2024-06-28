import React, { useState, useEffect } from "react";
import { GimnasiosMockService } from "../../services/gimnasios-mock.services";
function Proveedores() {
  const tituloPagina = "Proveedores";
  const [proveedores, setProveedores] = useState(null);
  useEffect(() => {
    BuscarProveedores();
  }, []);
  async function BuscarProveedores() {
    let data = await GimnasiosMockService.Buscar();
    setProveedores(data);
  }
  return (
    <section class="intro">
      <div class="tabla h-100">
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
                          <th style={{ width: "20%" }}>IdProveedor</th>
                          <th style={{ width: "20%" }}>Nombre</th>
                          <th style={{ width: "20%" }}>Pais</th>
                          <th style={{ width: "20%" }}>Telefono</th>
                          <th style={{ width: "20%" }}>FechaAltaEmpresa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {proveedores &&
                          proveedores.map((proveedores) => (
                            <tr key={proveedores.IdProveedor}>
                              <td>{proveedores.IdProveedor}</td>
                              <td>{proveedores.Nombre}</td>
                              <td>{proveedores.Pais}</td>
                              <td>{proveedores.Telefono}</td>
                              <td>{proveedores.FechaAltaEmpresa}</td>
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
export { Proveedores };
