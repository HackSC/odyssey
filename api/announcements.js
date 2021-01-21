const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");
const Busboy = require("busboy");
const AWS = require("aws-sdk");

router.use(utils.authMiddleware);

router.get("/", async (req, res) => {
  const announcements = await models.Announcement.findAll({});
  return res.json({ announcements });
});

module.exports = router;
