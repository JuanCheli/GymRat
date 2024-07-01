import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Inicio } from "./components/Inicio";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";

import { Maquinas } from "./components/maquinas/Maquinas";
import { Gimnasios } from "./components/gimnasios/Gimnasios";
import { Proveedores } from "./components/proveedores/Proveedores";
import { Inscriptos } from "./components/inscriptos/Inscriptos";

import { ModalDialog } from "./components/ModalDialog";

import { RequireAuth } from "./components/RequiereAuth";
import { Login } from "./components/login/Login.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/gimnasios" element={<Gimnasios />} />
            <Route path="/maquinas" element={<Maquinas/>} />
            <Route path="/proveedores" element={<Proveedores/>} />
            <Route
              path="/inscriptos"
              element={
                <RequireAuth>
                  <Inscriptos/>
                </RequireAuth>
              }
            />
            <Route path="/login/:componentFrom" element={<Login />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;