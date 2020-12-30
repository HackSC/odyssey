const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.requireNonHacker);

router.get("/", async (req, res) => {
  const result = await models.HackathonConstants.findAll({});
  return res.json({ result });
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

router.post("/update", async (req, res) => {
  const result = await models.HackathonConstants.update(
    {
      name: req.body.name,
      boolean: req.body.boolean,
      date: req.body.date,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );

  return res.json({ result });
});

router.post("/new", async (req, res) => {
  const result = await models.HackathonConstants.create({
    name: req.body.name,
    boolean: req.body.boolean,
    date: req.body.date,
  });

  return res.json({ result });
});

module.exports = router;
