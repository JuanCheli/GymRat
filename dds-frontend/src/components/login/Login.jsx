import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthService from "../../services/auth.services";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();
  const { componentFrom } = useParams();

  const navigateToComponent = () => {
    navigate(`/${componentFrom}`);
  };

  const handleIngresar = async () => {
    AuthService.login(usuario, clave, navigateToComponent);
  };

  useEffect(() => {
    AuthService.logout();
  });

  return (
    <div className="form-body">
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Por favor, ingrese su cuenta</h3>
              <p>Ingrese su información aquí abajo</p>
              <form className="requires-validation p-5" noValidate>
                <div className="col-md-12 img-container d-inline-flex justify-content-end">
                  <img
                    className="mb-4"
                    src="https://st5.depositphotos.com/2586633/64503/v/450/depositphotos_645039796-stock-illustration-minimalistic-logo-template-white-icon.jpg"
                    alt=""
                    width="120"
                    height="120"
                  />
                </div>

                <div className="col-md-12 form-floating">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="usuario"
                    onChange={(e) => setUsuario(e.target.value)}
                    value={usuario}
                    autoFocus
                    className="form-control"
                    id="usuario"
                    required
                  />
                  <label className="custom-control" htmlFor="usuario">
                    Usuario
                  </label>
                  <div className="valid-feedback">El campo usuario es válido!</div>
                  <div className="invalid-feedback">El campo usuario no puede estar vacio!</div>
                </div>

                <div className="col-md-12 form-floating">
                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="Clave"
                    onChange={(e) => setClave(e.target.value)}
                    value={clave}
                    className="form-control"
                    id="clave"
                    required
                  />
                  <label className="custom-control" htmlFor="clave">
                    Contraseña
                  </label>
                  <div className="valid-feedback">El campo contraseña es válido!</div>
                  <div className="invalid-feedback">El campo contraseña no puede estar vacio!</div>
                </div>

                <div className="form-check mb-3">
                <br/> 
                  <label className="form-check-label">
                    <input type="checkbox" value="remember-me" className="form-check-input" />Recordarme
                  </label>
                </div>

                <div className="form-button mt-3 d-flex justify-content-center">
                <br/> 
                  <button
                    className="button-64"
                    type="button"
                    onClick={handleIngresar}
                  >
                    <span class="text">Ingresar</span>
                  </button>
                </div>

                <div className="col-md-12">
                  <p className="mt-5 mb-3 text-light d-flex justify-content-center">© GymRat - 2024</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export { Login };
