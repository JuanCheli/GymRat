// opcion 1 cuando se hacen pruebas locales
const urlServidor = "http://localhost:3000"


// opcion 2 cuando se despliega el frontend en un servidor distinto al backend
// const urlServidor = "https://labsys.frc.utn.edu.ar/dds-backend-2024"
//const urlServidor = "https://dds-backend.azurewebsites.net"
//const urlServidor = "https://webapi.pymes.net.ar"


// opcion 3 cuando se despliega el frontend, en el mismo servidor que el backend
//const urlServidor = ""  




const urlResourceMaquinas = urlServidor + "/api/maquinas";
const urlResourceProveedores = urlServidor + "/api/proveedores";
const urlResourceGimnasios = urlServidor + "/api/gimnasios";
const urlResourceInscriptos = urlServidor + "/api/inscriptos";




export const config = {
    urlServidor,
    urlResourceMaquinas,
    urlResourceProveedores,
    urlResourceGimnasios,
    urlResourceInscriptos,
}
