const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");

router.get("/", utils.authMiddleware, async (req, res) => {
  const hackerProfile = await models.HackerProfile.findAll({
    where: {
      userId: req.user.id
    }
  });
  return res.json({ hackerProfile });
});
