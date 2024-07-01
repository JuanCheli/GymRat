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
    <header>
    <nav className="navbar sticky-top bg-nav navbar-expand-md">
      <div className="container-fluid navbar-dark">
        <a className="navbar-brand" href="#!">
          <i className="fa fa-dumbbell"></i>
          <i> GymRat</i>
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
              <NavLink className="nav-link" to="/gimnasios">
                Gimnasios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/maquinas">
                Maquinas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/proveedores">
                Proveedores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                title="Exclusivo para gimnasios"
                to="/inscriptos"
              >
                Inscriptos
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#!"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Asesoramiento
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a className="dropdown-item" href="https://www.menshealth.com/es/nutricion-dietetica/a35224821/dieta-fitness-15-alimentos/" target="_blank">
                    Planes alimenticios
                  </a>
                </li>
                <li>
                  <a className="dropdown-item  dropdown-menu-dark" href="https://www.myprotein.es/thezone/entrenamiento/" target="_blank">
                    Planes de entrenamiento
                  </a>
                </li>
                <li>
                  <a className="dropdown-item  dropdown-menu-dark" href="https://www.energyzone.com.ar/?gad_source=1&gclid=CjwKCAjwm_SzBhAsEiwAXE2Cv-RoIONtzNj9KAsgoenX4GKOoDdJ6ME9ESTBXx3Q3XntIWWCxu5LgxoCMcQQAvD_BwE" target="_blank">
                    Suplementacion
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {usuarioLogueado && (
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Bienvenido {usuarioLogueado}
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
                      usuarioLogueado ? "fa-solid fa-right-from-bracket" : "fa-solid fa-user"
                    }
                  ></i>
                </span>
                {usuarioLogueado ? " Cerrar Sesión" : " Iniciar Sesión"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
  );
}
export { Menu };
