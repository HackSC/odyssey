const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");
const Busboy = require("busboy");
const AWS = require("aws-sdk");

router.use(utils.authMiddleware);

router.get("/", async (req, res) => {
  const result = await models.Judgings.findAll({
    where: {
      judgeId: req.user.id,
    },
    include: [
      {
        model: models.Team,
        as: "team",
      },
    ],
  });

  return res.json({ result });
});

router.get("/fullList", async (req, res) => {
  const result = await models.Judgings.findAll({});

  return res.json({ result });
});

module.exports = router;
