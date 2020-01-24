const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

/* This router supports superuser routes, such as updating the status of users */

router.use(utils.authMiddleware);
router.use(utils.requireAdmin);

router.get("/", async (req, res) => {
  try {
    const events = await models.Event.findAll();
    return res.json({ events });
  } catch (e) {
    return res.json({ err: e });
  }
});

router.post("/", async (req, res) => {
  try {
    const { startsAt, endsAt, name, description } = { ...req.body };
    const newEvent = await models.Event.create({
      name: name,
      description: description,
      startsAt: startsAt,
      endsAt: endsAt
    });
    return res.json({ newEvent });
  } catch (e) {
    return res.json({ err: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await models.Event.destroy({
      where: {
        id: id
      }
    });
    return res.status(200).json({ result: "success" });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

module.exports = router;
