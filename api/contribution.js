const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

router.use(utils.authMiddleware);

router.get("/all", async (req, res) => {
  try {
    const contributions = await models.Contribution.findAll();
    return res.json({ contributions: contributions });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
});

module.exports = router;
