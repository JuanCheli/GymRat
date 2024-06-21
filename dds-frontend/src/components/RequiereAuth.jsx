import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.services";


function RequireAuth({ children }) {
  let usuarioLogueado = AuthService.getUsuarioLogueado();


  // verificar la autenticacion
  if (!usuarioLogueado) {
    // no funciona en el build
    // return <Navigate to={"/login/" + children.type.name} />;  
    return <Navigate to={"/login/" + children.type.NombreComponenteNoOfuscado} />;
  }




  // un nivel mas de seguridad seria verificar la autorizacion...
  return children;
}


export { RequireAuth };
