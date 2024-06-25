const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");


router.get("/api/maquinas", async function (req, res, next) {
    // #swagger.tags = ['maquinas']
    // #swagger.summary = 'obtiene todos los maquinas'
    // consulta de artículos con filtros y paginacion

    let where = {};
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.Maquina.findAndCountAll({
        attributes: [
            "IdMaquina",
            "Nombre",
            "FechaCreacion",
            "Eliminado",
        ],
        order: [["Nombre", "ASC"]],
        where,
        offset: (Pagina - 1) * TamañoPagina,
        limit: TamañoPagina,
    });

    return res.json({ Items: rows, RegistrosTotal: count });
});

router.get("/api/maquinas/:id", async function (req, res, next) {
    // #swagger.tags = ['maquinas']
    // #swagger.summary = 'obtiene un Articulo'
    // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
    let items = await db.Maquina.findOne({
        attributes: [
            "IdMaquina",
            "Nombre",
            "Gimnasio",
            "Proveedor",
            "FechaCreacion",
            "Eliminado"
        ],
        where: { IdMaquina: req.params.id },
    });
    res.json(items);
});

router.post("/api/maquinas/", async (req, res) => {
    // #swagger.tags = ['maquinas']
    // #swagger.summary = 'agrega un Articulo'
    /*    #swagger.parameters['item'] = {
                  in: 'body',
                  description: 'nueva Artículo',
                  schema: { $ref: '#/definitions/maquinas' }
      } */
    try {
        let data = await db.Maquina.create({
            Nombre: req.body.Nombre,
            Gimnasio: req.body.Gimnasio,
            Proveedor: req.body.Proveedor,
            FechaCreacion: req.body.FechaCreacion,
            Eliminado: req.body.Eliminado,
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

router.put("/api/maquinas/:id", async (req, res) => {
    // #swagger.tags = ['maquinas']
    // #swagger.summary = 'actualiza un Artículo'
    // #swagger.parameters['id'] = { description: 'identificador del Artículo...' }
    /*    #swagger.parameters['Articulo'] = {
                  in: 'body',
                  description: 'Articulo a actualizar',
                  schema: { $ref: '#/definitions/maquinas' }
      } */

    try {
        let item = await db.Maquina.findOne({
            attributes: [
                "IdMaquina",
                "Nombre",
                "Gimnasio",
                "Proveedor",
                "FechaCreacion",
                "Eliminado",
            ],
            where: { IdMaquina: req.params.id },
        });
        if (!item) {
            res.status(404).json({ message: "Maquina No Encontrada" });
            return;
        }
        item.Nombre = req.body.Nombre,
        item.Gimnasio = req.body.Gimnasio,
        item.Proveedor = req.body.Proveedor,
        item.FechaCreacion = req.body.FechaCreacion,
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

router.delete("/api/maquinas/:id", async (req, res) => {
    // #swagger.tags = ['maquinas']
    // #swagger.summary = 'elimina un Articulo'
    // #swagger.parameters['id'] = { description: 'identificador del Articulo.' }

    let bajaFisica = false;

    if (bajaFisica) {
        // baja física
        let filasBorradas = await db.Maquina.destroy({
            where: { IdMaquina: req.params.id },
        });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    } else {
        // baja lógica
        try {
            let data = await db.sequelize.query(
                'UPDATE Maquinas SET eliminado = 1 WHERE IdMaquina = :IdMaquina',
                {
                    replacements: { IdMaquina: req.params.id },
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
    "/api/maquinasJWT",
    auth.authenticateJWT,
    async function (req, res, next) {
      /* #swagger.security = [{
                 "bearerAuth1": []
          }] */
  
      // #swagger.tags = ['maquinas']
      // #swagger.summary = 'obtiene todas las Maquinas, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
      const { rol } = res.locals.user;
      if (rol !== "admin") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }
  
      let items = await db.Maquina.findAll({
        attributes: [
            "IdMaquina",
            "Nombre",
            "Gimnasio",
            "Proveedor",
            "FechaCreacion",
            "Eliminado"
        ],
        order: [["Nombre", "ASC"]],
      });
      res.json(items);
    }
  );
  

module.exports = router;
