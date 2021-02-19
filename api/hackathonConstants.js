const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await models.HackathonConstants.findAll({});
  return res.status(200).json({ result });
});

router.delete("/delete", utils.requireAdmin, async (req, res) => {
  const id = req.body.id;
  await models.HackathonConstants.destroy({
    where: {
      id: id,
    },
  });

  return res.json({ result: true });
});

router.post("/update", utils.requireAdmin, async (req, res) => {
  const result = await models.HackathonConstants.update(
    {
      name: req.body.name,
      boolean: req.body.boolean,
      date: req.body.date,
      type: req.body.type,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );

  return res.json({ result });
});

router.post("/new", utils.requireAdmin, async (req, res) => {
  const result = await models.HackathonConstants.create({
    name: req.body.name,
    boolean: req.body.boolean,
    date: req.body.date,
    type: req.body.type,
  });

  return res.json({ result });
});

module.exports = router;
