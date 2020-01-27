const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

/* This router supports superuser routes, such as updating the status of users */

router.use(utils.authMiddleware);
router.use(utils.requireAdmin);

router.get("/category", async (req, res) => {
  try {
    const groups = await models.Grouping.findAll({
      include: [{ model: models.Task, required: false }]
    });
    return res.json({ groups });
  } catch (e) {
    return res.json({ err: e.message });
  }
});

module.exports = router;
