import React from "react";
import moment from "moment";

export default function MaquinasListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivarStock,
  ActivarDesactivarMaquina,
  Gimnasios,
  Proveedores,
  Imprimir,
  RegistrosTotal,
  Pagina,
  Paginas,
  Buscar,
}) {
  // Log para verificar los datos recibidos
  //console.log("Gimnasios:", Gimnasios);
  //console.log("Proveedores:", Proveedores);

  function getNombreProveedor(IdProveedor) {
    //console.log("IdProveedor:", IdProveedor);
    if (!Proveedores || Proveedores.length === 0) {
      console.log("No Proveedores found");
      return IdProveedor;
    }
    const Proveedor = Proveedores.find((g) => g.IdProveedor === IdProveedor);
    //console.log("Proveedor found:", Proveedor);
    return Proveedor ? Proveedor.Nombre : IdProveedor;
  }

  function getNombreGimnasio(IdGimnasio) {
    //console.log("IdGimnasio:", IdGimnasio);
    if (!Gimnasios || Gimnasios.length === 0) {
      console.log("No Gimnasios found");
      return IdGimnasio;
    }
    const gimnasio = Gimnasios.find((g) => g.IdGimnasio === IdGimnasio);
    //console.log("Gimnasio found:", gimnasio);
    return gimnasio ? gimnasio.Nombre : IdGimnasio;
  }

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
                        <th className="text-center">Fecha Creacion</th>
                        <th className="text-center">Con Stock</th>
                        <th className="text-center text-nowrap">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Items &&
                        Items.map((Item) => (
                          <tr key={Item.IdMaquina}>
                            <td>{Item.Nombre}</td>
                            <td className="text-end">
                              {getNombreGimnasio(Item.IdGimnasio)}
                            </td>
                            <td className="text-end">
                              {getNombreProveedor(Item.IdProveedor)}
                            </td>
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
                                <i className={"fa fa-archive"}></i>
                              </button>
                              <button
                                className={
                                  "btn btn-sm " +
                                  (!Item.Eliminado
                                    ? "btn-outline-danger"
                                    : "btn-outline-success")
                                }
                                title={
                                  !Item.Eliminado ? "Desactivar" : "Activar"
                                }
                                onClick={() => ActivarDesactivarMaquina(Item)}
                              >
                                <i
                                  className={
                                    "fa fa-" +
                                    (!Item.Eliminado ? "times" : "check")
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
                      <div className="col text-center">
                        Pagina: &nbsp;
                        <select
                          value={Pagina}
                          onChange={(e) => {
                            Buscar(e.target.value);
                          }}
                        >
                          {Paginas?.map((x) => (
                            <option value={x} key={x}>
                              {x}
                            </option>
                          ))}
                        </select>
                        &nbsp; de {Paginas?.length}
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
