const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");
const Busboy = require("busboy");
const AWS = require("aws-sdk");

router.use(utils.authMiddleware);

router.get("/:role", async (req, res) => {
  const role = req.params.role;
  let announcements = null;
  if (role != null && role != "") {
    announcements = await models.Announcement.findAll({
      where: {
        target: role,
      },
    });
  } else {
    announcements = await models.Announcement.findAll({});
  }
  return res.json({ announcements });
});

module.exports = router;
