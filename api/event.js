const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

/* This router supports superuser routes, such as updating the status of users */

router.use(utils.authMiddleware);
router.use(utils.requireAdmin);

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await models.Task.findAll();
    return res.json({ tasks: tasks });
  } catch (e) {
    return res.json({ err: e });
  }
});

router.get("/events", async (req, res) => {
  // TODO: Make this work
});

module.exports = router;
