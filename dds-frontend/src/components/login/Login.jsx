import React, { useState, useEffect } from "react";
import "./Login.css"; //css global
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
    <>
      <div className="divbody text-center">
        <main className="form-signin w-100 m-auto">
          <form className="p-5">
            <img
              className="mb-4"
              src="https://i.pinimg.com/originals/1c/03/26/1c0326e1f7aa89855ab1677bd023f0ff.png"
              alt=""
              width="72"
              height="72"
            />
            <h1 className="h4 mb-3 fw-normal">Por favor ingrese su cuenta</h1>
            <div className="form-floating">
              <input
                type="text"
                autoComplete="off"
                placeholder="usuario"
                onChange={(e) => setUsuario(e.target.value)}
                value={usuario}
                autoFocus
                className="form-control"
                id="usuario"
              />
              <label className="custom-control" for="usuario">
                Usuario
              </label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                autoComplete="off"
                placeholder="Clave"
                onChange={(e) => setClave(e.target.value)}
                value={clave}
                className="form-control"
                id="clave"
              />
              <label className="custom-control" htmlFor="clave">
                Contraseña
              </label>
            </div>

            <div className="checkbox mb-3">
              <label className="custom-control">
                <input type="checkbox" value="remember-me" /> Recordarme
              </label>
            </div>
            <button
              className="w-100 btn btn-lg btn-primary"
              type="button"
              onClick={(e) => handleIngresar()}
            >
              Ingresar
            </button>
            <p className="mt-5 mb-3 text-muted">© 2024</p>
          </form>
        </main>
      </div>
    </>
  );
}
export { Login };
