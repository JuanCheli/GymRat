const express = require("express");
const router = express.Router();
const { ValidationError } = require('sequelize');
const db = require("../base-orm/sequelize-init");

router.get("/api/proveedores", async function (req, res, next) {
  let data = await db.Proveedor.findAll({
    attributes: ["IdProveedor", "Nombre", "Pais", "Telefono", "FechaAltaEmpresa"],
  });
  res.json(data);
});

router.get("/api/proveedores/:id", async function (req, res, next) {
  // #swagger.tags = ['proveedores']
  // #swagger.summary = 'obtiene un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  let items = await db.Proveedor.findOne({
    attributes: [
      "IdProveedor",
      "Nombre",
      "Pais",
      "Telefono",
      "FechaAltaEmpresa",
    ],
    where: { IdProveedor: req.params.id },
  });
  res.json(items);
});

router.post("/api/proveedores/", async (req, res) => {
  // #swagger.tags = ['proveedores']
  // #swagger.summary = 'agrega un Articulo'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nueva Artículo',
                schema: { $ref: '#/definitions/proveedores' }
    } */
  try {
    let data = await db.Proveedor.create({
      Nombre: req.body.Nombre,
      Pais: req.body.Pais,
      Telefono: req.body.Telefono,
      FechaAltaEmpresa: req.body.FechaAltaEmpresa
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

router.put("/api/proveedores/:id", async (req, res) => {
  // #swagger.tags = ['proveedores']
  // #swagger.summary = 'actualiza un Artículo'
  // #swagger.parameters['id'] = { description: 'identificador del Artículo...' }
  /*    #swagger.parameters['Articulo'] = {
                in: 'body',
                description: 'Articulo a actualizar',
                schema: { $ref: '#/definitions/proveedores' }
    } */

  try {
    let item = await db.Proveedor.findOne({
        attributes: [
            "IdProveedor",
            "Nombre",
            "Pais",
            "Telefono",
            "FechaAltaEmpresa",
            "Eliminado"
          ],
      where: { IdProveedor: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Proveedor No Encontrado" });
      return;
    }
    item.IdProveedor = req.body.IdProveedor
    item.Nombre = req.body.Nombre,
    item.Pais = req.body.Pais,
    item.Telefono = req.body.Telefono
    item.FechaAltaEmpresa = req.body.FechaAltaEmpresa,
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

router.delete("/api/proveedores/:id", async (req, res) => {
  // #swagger.tags = ['proveedores']
  // #swagger.summary = 'elimina un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo.' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja física
    let filasBorradas = await db.Proveedor.destroy({
      where: { IdProveedor: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        'UPDATE proveedores SET eliminado = 1 WHERE IdProveedor = :IdProveedor',
        {
          replacements: { IdProveedor: req.params.id },
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
