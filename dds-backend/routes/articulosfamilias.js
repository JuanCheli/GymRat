const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/articulosfamilias", async function (req, res, next) {
  let data = await db.articulosfamilias.findAll({
    attributes: ["IdArticuloFamilia", "Nombre"],
  });
  res.json(data);
});

router.get('/api/articulosfamilias/:id', async function (req, res) {
    try {
        const articuloFamilia = await ArticulosFamilias.findByPk(req.params.id);
        if (articuloFamilia) {
            res.json(articuloFamilia);
        } else {
            res.status(404).json({ message: 'articulofamilia no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
