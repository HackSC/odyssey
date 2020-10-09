const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

router.use(utils.authMiddleware);

router.get("/all", async (req, res) => {
  const contributions = await models.Contribution.findAll();
  return res.json({ success: contributions });
});

router.get("/owned", async (req, res) => {
  const contributions = await models.Contribution.findAll({
    where: {
      personId: req.user.id,
    },
  });
  return res.json({ success: contributions });
});

router.post("/create", async (req, res) => {
  const input = req.body;

  if (!input.taskId) {
    return res.status(400).json({ error: "Missing TaskID" });
  } else {
    const result = await models.Contribution.build({
      personId: req.user.id,
      taskId: input.taskId,
    }).save();
    return res.json({ success: result });
  }
});

module.exports = router;
