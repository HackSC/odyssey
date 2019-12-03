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

router.post("/create", async (req, res) => {
  const input = req.body;

  if (!input.taskId) {
    return res.status(400).json({ message: "Invalid request" });
  } else {
    try {
      const result = await models.Contribution.build({
        personId: req.user.id,
        taskId: input.taskId
      }).save();
      return res.json({ contribution: result });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: e.message });
    }
  }
});

module.exports = router;
