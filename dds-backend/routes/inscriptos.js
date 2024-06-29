const express = require("express");
const router = express.Router();
const { ValidationError } = require('sequelize');
const db = require("../base-orm/sequelize-init");
const auth = require("../seguridad/auth");

router.get("/api/inscriptos", async function (req, res, next) {
  let data = await db.Inscripto.findAll({
    attributes: ["IdInscripto", "Nombre", "FechaInscripcion", "IdGimnasio"],
  });
  res.json(data);
});

router.get("/api/inscriptos/:id", async function (req, res, next) {
  // #swagger.tags = ['inscriptos']
  // #swagger.summary = 'obtiene un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  let items = await db.Inscripto.findOne({
    attributes: [
      "IdInscripto",
      "Nombre",
      "FechaInscripcion",
      "IdGimnasio",
      "Eliminado"
    ],
    where: { IdInscripto: req.params.id },
  });
  res.json(items);
});

router.post("/api/inscriptos/", async (req, res) => {
  // #swagger.tags = ['inscriptos']
  // #swagger.summary = 'agrega un Articulo'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nueva Artículo',
                schema: { $ref: '#/definitions/inscriptos' }
    } */
  try {
    let data = await db.Inscripto.create({
      Nombre: req.body.Nombre,
      FechaInscripcion: req.body.FechaInscripcion,
      IdGimnasio: req.body.IdGimnasio,
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

router.put("/api/inscriptos/:id", async (req, res) => {
  // #swagger.tags = ['inscriptos']
  // #swagger.summary = 'actualiza un Artículo'
  // #swagger.parameters['id'] = { description: 'identificador del Artículo...' }
  /*    #swagger.parameters['Articulo'] = {
                in: 'body',
                description: 'Articulo a actualizar',
                schema: { $ref: '#/definitions/inscriptos' }
    } */

  try {
    let item = await db.Inscripto.findOne({
      attributes: [
        "IdInscripto",
        "Nombre",
        "FechaInscripcion",
        "IdGimnasio",
      ],
      where: { IdInscripto: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "inscripto No Encontrado" });
      return;
    }
    item.IdInscripto = req.body.IdInscripto
    item.Nombre = req.body.Nombre,
    item.FechaInscripcion = req.body.FechaInscripcion,
    item.IdGimnasio = req.body.IdGimnasio
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

router.delete("/api/inscriptos/:id", async (req, res) => {
  // #swagger.tags = ['inscriptos']
  // #swagger.summary = 'elimina un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo.' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja física
    let filasBorradas = await db.Inscripto.destroy({
      where: { IdInscripto: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        'UPDATE inscriptos SET eliminado = 1 WHERE IdInscripto = :IdInscripto',
        {
          replacements: { IdInscripto: req.params.id },
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

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
  "/api/inscriptosJWT",
  auth.authenticateJWT,
  async function (req, res, next) {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "Usuario no autorizado!" });
    }

    let items = await db.Inscripto.findAll({
      attributes: [
        "IdInscripto",
        "Nombre",
        "FechaInscripcion",
        "IdGimnasio",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
);



module.exports = router;
