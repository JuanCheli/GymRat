import React from "react";
import moment from "moment";

export default function MaquinasListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivarStock,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <section className="intro">
      <div className="tabla">
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="table-responsive">
                  <div className="tituloPagina">Máquinas</div>
                  <table className="table table-dark table-bordered mb-0">
                    <thead>
                      <tr>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Gimnasio</th>
                        <th className="text-center">Proveedor</th>
                        <th className="text-center">FechaCreacion</th>
                        <th className="text-center">Con Stock</th>
                        <th className="text-center text-nowrap">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Items &&
                        Items.map((Item) => (
                          <tr key={Item.IdMaquina}>
                            <td>{Item.Nombre}</td>
                            <td className="text-end">{Item.IdGimnasio}</td>
                            <td className="text-end">{Item.IdProveedor}</td>
                            <td className="text-end">
                              {moment(Item.FechaCreacion).format("DD/MM/YYYY")}
                            </td>
                            <td>{Item.ConStock ? "SI" : "NO"}</td>
                            <td className="text-center text-nowrap">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                title="Consultar"
                                onClick={() => Consultar(Item)}
                              >
                                <i className="fa fa-eye"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-primary"
                                title="Modificar"
                                onClick={() => Modificar(Item)}
                              >
                                <i className="fa fa-pencil"></i>
                              </button>
                              <button
                                className={
                                  "btn btn-sm " +
                                  (Item.ConStock
                                    ? "btn-outline-danger"
                                    : "btn-outline-success")
                                }
                                title={
                                  Item.ConStock ? "No hay Stock" : "Hay Stock"
                                }
                                onClick={() => ActivarDesactivarStock(Item)}
                              >
                                <i
                                  className={
                                    "fa fa-" +
                                    (Item.ConStock ? "times" : "check")
                                  }
                                ></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {/* Paginador*/}
                  <div className="paginador bg-dark">
                    <div className="row">
                      <div className="col">
                        <span className="pyBadge">
                          Registros: {RegistrosTotal}
                        </span>
                      </div>
                      <div className="col">
                        <button
                          className="button-64 h6 h-100 float-end"
                          onClick={() => Imprimir()}
                        >
                          <i className="fa fa-print"></i>Imprimir
                        </button>
                      </div>
                    </div>
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
