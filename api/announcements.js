const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");
const Busboy = require("busboy");
const AWS = require("aws-sdk");

router.get("/:role", async (req, res) => {
  const role = req.params.role;
  let announcements = null;
  if (role != null && role != "") {
    announcements = await models.Announcement.findAll({
      where: {
        target: role,
      }
    });
  } else {
    announcements = await models.Announcement.findAll({});
  }
  return res.json({ announcements });
});

router.post("/", async (req, res) => {
  try {
    const { target, text, from, img } = { ...req.body };
    const newAnnouncement = await models.Announcement.create({
      target: target,
      text: text,
      from: from,
      img: img,
    });
    return res.json({ newAnnouncement });
  } catch (e) {
    return res.json({ err: e });
  }
});

module.exports = router;
