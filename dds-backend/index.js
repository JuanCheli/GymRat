const express = require("express");

// Crear servidor
const app = express();
app.use(express.json()); // para poder leer json en el body


// Controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

const articulosfamiliasmockRouter = require("./routes/articulosfamiliasmock");
app.use(articulosfamiliasmockRouter);


// Levantar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`El sitio está escuchando en el puerto ${port}`);
});