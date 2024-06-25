const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/gimnasios", async function (req, res, next) {
  let data = await db.Gimnasio.findAll({
    attributes: ["IdGimnasio", "Nombre", "FechaAlta"],
  });
  res.json(data);
});


module.exports = router;
