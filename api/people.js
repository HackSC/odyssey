const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

router.use(utils.authMiddleware);

router.get("/self", async (req, res) => {
  try {
    const [person, isCreated] = await models.Person.findOrCreate({
      where: {
        identityId: req.user.id,
      },
      defaults: { isBattlepassComplete: false },
    });

    return res.json({ person });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
});

router.get("/houses", async (req, res) => {
  try {
    const houses = await models.House.findAll();
    return res.json({ houses: houses });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.post("/houses", async (req, res) => {
  try {
    const postValues = req.body;
    const { name, color } = { ...postValues };
    const house = await models.House.create({ name: name, color: color });
    return res.json({ newHouse: house });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.put("/houses", async (req, res) => {
  try {
    const values = req.body;
    const houseId = values.id;
    const result = await models.House.update(
      { ...values },
      { where: { id: houseId } }
    );
    return res.json({ result: result });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.delete("/houses/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await models.House.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ result: "success" });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

module.exports = router;
