import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.services";


function RequireAuth({ children }) {
  let usuarioLogueado = AuthService.getUsuarioLogueado();
  if (!usuarioLogueado) {
    return <Navigate to={"/login/" + children.type.NombreComponenteNoOfuscado} />;
  }
  
  return children;
}


export { RequireAuth };
