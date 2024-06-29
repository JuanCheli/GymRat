const express = require("express");
const router = express.Router();
const { ValidationError } = require('sequelize');
const db = require("../base-orm/sequelize-init");

router.get("/api/gimnasios", async function (req, res, next) {
  let data = await db.Gimnasio.findAll({
    attributes: ["IdGimnasio", "Nombre", "FechaAlta"],
  });
  res.json(data);
});

router.get("/api/gimnasios/:id", async function (req, res, next) {
  // #swagger.tags = ['gimnasios']
  // #swagger.summary = 'obtiene un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  let items = await db.Gimnasio.findOne({
    attributes: [
      "IdGimnasio",
      "Nombre",
      "FechaAlta",
      "Eliminado"
    ],
    where: { IdGimnasio: req.params.id },
  });
  res.json(items);  
});

router.post("/api/gimnasios/", async (req, res) => {
  // #swagger.tags = ['gimnasios']
  // #swagger.summary = 'agrega un Articulo'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nueva Artículo',
                schema: { $ref: '#/definitions/gimnasios' }
    } */
  try {
    let data = await db.Gimnasio.create({
      Nombre: req.body.Nombre,
      FechaAlta: req.body.FechaAlta
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("/api/gimnasios/:id", async (req, res) => {
  // #swagger.tags = ['gimnasios']
  // #swagger.summary = 'actualiza un Artículo'
  // #swagger.parameters['id'] = { description: 'identificador del Artículo...' }
  /*    #swagger.parameters['Articulo'] = {
                in: 'body',
                description: 'Articulo a actualizar',
                schema: { $ref: '#/definitions/gimnasios' }
    } */

  try {
    let item = await db.Gimnasio.findOne({
      attributes: [
        "IdGimnasio",
        "Nombre",
        "FechaAlta",
        "Eliminado"
      ],
      where: { IdGimnasio: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Gimnasio No Encontrado" });
      return;
    }
    item.idGimnasio = req.body.idGimnasio
    item.Nombre = req.body.Nombre,
    item.FechaAlta = req.body.FechaAlta,
    item.Eliminado = req.body.Eliminado,
    await item.save();
    res.sendStatus(204);

  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete("/api/gimnasios/:id", async (req, res) => {
  // #swagger.tags = ['gimnasios']
  // #swagger.summary = 'elimina un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo.' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja física
    let filasBorradas = await db.Gimnasio.destroy({
      where: { IdGimnasio: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        'UPDATE gimnasios SET eliminado = 1 WHERE IdGimnasio = :IdGimnasio',
        {
          replacements: { IdGimnasio: req.params.id },
          type: db.sequelize.QueryTypes.UPDATE,
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});

module.exports = router;
