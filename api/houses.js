const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

router.use(utils.authMiddleware);

router.get("/houses", async (req, res) => {
  try {
    const houses = await models.House.findAll();
    return res.json({ houses: houses });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

module.exports = router;
