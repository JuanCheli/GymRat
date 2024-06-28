import { Link } from "react-router-dom";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";

function Inicio() {
  return (
    <div className="inicio-container h-screen flex flex-col justify-center items-center px-4 text-neutral-400 m-0 d-grid gap-0">
      <div className="h-[20rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="centered-element max-w-2xl mx-auto p-4">
          <h1 className="inicio-container-title display-1 relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            GymRat
          </h1>
          <p className="inicio-container-desc display-5 text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Información sobre gimnasios, máquinas, proveedores e inscriptos
          </p> <br />
          <div className="text-center mt-8">
            <Link to="/gimnasios">
              <button className="button-64 boton-gimnasios" role="button">
                <span className="text">
                  <i className="fa fa-search"></i>Ver Gimnasios
                </span>
              </button>
            </Link>
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </div>
  );
}

export { Inicio };
