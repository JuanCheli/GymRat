const express = require("express");

// Crear servidor
const app = express();
require("./base-orm/sqlite-init");  // crear base si no existe
app.use(express.json()); // para poder leer json en el body


// Controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

const articulosfamiliasmockRouter = require("./routes/articulosfamiliasmock");
app.use(articulosfamiliasmockRouter);

const articulosfamiliasRouter = require("./routes/articulosfamilias");
app.use(articulosfamiliasRouter);


// Levantar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`El sitio está escuchando en el puerto ${port}`);
});