const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/gimnasios", async function (req, res, next) {
  let data = await db.Gimnasio.findAll({
    attributes: ["IdGimnasio", "Nombre", "FechaAlta"],
  });
  res.json(data);
});

router.get("/api/gimnasios/:id", async function (req, res, next) {
  // #swagger.tags = ['maquinas']
  // #swagger.summary = 'obtiene un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  let items = await db.Maquina.findOne({
      attributes: [
          "IdGimnasio",
          "Nombre",
          "FechaAlta",
      ],
      where: { IdGimnasio: req.params.id },
  });
  res.json(items);
});



module.exports = router;
