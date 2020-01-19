const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

router.use(utils.authMiddleware);

router.get("/self", async (req, res) => {
  try {
    const pointsProfile = await models.Person.findOrCreate({
      where: {
        identityId: req.user.id
      },
      defaults: { isBattlepassComplete: false }
    });

    return res.json({ person: pointsProfile });
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

router.post("/create", async (req, res) => {
  try {
    const postValues = req.body;
    const { name, color } = { ...postValues };
    const house = await models.House.create({ name: name, color: color });
    return res.json({ newHouse: house });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

module.exports = router;
