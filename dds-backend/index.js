const express = require("express");

// Crear servidor
const app = express();
const cors = require("cors")
require("./base-orm/sqlite-init");  // crear base si no existe
app.use(express.json());
app.use(cors({origin: "*"})) // para poder leer json en el body


// Controlar ruta
app.get("/", (req, res) => {
  res.send("Backend GymRat inicializado!");
});


const gimnasioRouter = require("./routes/gimnasios");
app.use(gimnasioRouter);

const maquinasRouter = require("./routes/maquinas");
app.use(maquinasRouter);

const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);



// Levantar servidor
if (!module.parent) {   // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
    const port = process.env.PORT || 3000;   // en producción se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  }
  module.exports = app; // para testing
  