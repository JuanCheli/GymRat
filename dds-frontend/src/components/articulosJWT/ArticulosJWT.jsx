import React, { useState, useEffect } from "react";
import { articulosJWTService } from "../../services/articulosJWT.services";

function ArticulosJWT() {
  const tituloPagina = "Articulos JWT (solo para admintradores)";
  const [articulos, setArticulos] = useState(null);

  // cargar al iniciar el componente, solo una vez
  useEffect(() => {
    BuscarArticulosJWT();
  }, []);

  async function BuscarArticulosJWT() {
    try {
      let data = await articulosJWTService.Buscar();
      setArticulos(data);
    } catch (error) {
      console.log("error al buscar datos en el servidor!");
    }
  }

  return (
    <>
      <div className="tituloPagina">{tituloPagina}</div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>IdArticulo</th>
            <th style={{ width: "50%" }}>Nombre</th>
            <th style={{ width: "30%" }}>Precio</th>
          </tr>
        </thead>
        <tbody>
          {articulos &&
            articulos.map((articulofamilia) => (
              <tr key={articulofamilia.IdArticulo}>
                <td>{articulofamilia.IdArticulo}</td>
                <td>{articulofamilia.Nombre}</td>
                <td>{articulofamilia.Precio}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
ArticulosJWT.NombreComponenteNoOfuscado = "ArticulosJWT";
export { ArticulosJWT };
