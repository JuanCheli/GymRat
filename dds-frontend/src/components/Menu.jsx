import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../services/auth.services";

function Menu() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(
    AuthService.getUsuarioLogueado()
  );

  function CambioUsuarioLogueado(_usuarioLogueado) {
    setUsuarioLogueado(_usuarioLogueado);
  }

  useEffect(() => {
    AuthService.subscribeUsuarioLogueado(CambioUsuarioLogueado);
    return () => {
      AuthService.subscribeUsuarioLogueado(null);
    };
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="#!">
          <i className="fa fa-industry"></i>
          &nbsp;<i>Pymes</i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/articulosfamilias">
                Articulos Familias
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/articulos">
                Articulos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                title="exclusivo para administradores"
                to="/articulosjwt"
              >
                Articulos JWT
              </NavLink>
            </li>

            <li className="nav-item dropdown bg-dark">
              <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Informes
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#!">
                    Ventas
                  </a>
                </li>
                <li>
                  <a className="dropdown-item  dropdown-menu-dark" href="#!">
                    Compras
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item  dropdown-menu-dark" href="#!">
                    Libro de IVA
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {usuarioLogueado && (
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Bienvenido: {usuarioLogueado}
                </a>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/login/Inicio">
                <span
                  className={usuarioLogueado ? "text-warning" : "text-success"}
                >
                  <i
                    className={
                      usuarioLogueado ? "fa fa-sign-out" : "fa fa-sign-in"
                    }
                  ></i>
                </span>
                {usuarioLogueado ? " Logout" : " Login"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export { Menu };
