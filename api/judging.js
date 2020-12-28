const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");
const Busboy = require("busboy");
const AWS = require("aws-sdk");

router.use(utils.authMiddleware);
router.use(utils.requireNonHacker);

router.get("/", async (req, res) => {
  const judgings = await models.Judgings.findAll({
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

  var result = [];
  for (const judge of judgings) {
    const teammates = await models.HackerProfile.findAll({
      where: {
        teamId: judge.dataValues.team.id,
      },
    });
    result.push(Object.assign({}, judge.dataValues, { teammates: teammates }));
  }
  return res.json({ result });
});

router.delete("/", utils.requireAdmin, async (req, res) => {
  const id = req.body.id;
  await models.Judgings.destroy({
    where: {
      id: id,
    },
  });

  return res.json({ result: true });
});

router.post("/", async (req, res) => {
  const result = await models.Judgings.update(
    {
      notes: req.body.notes,
      vertical: req.body.vertical,
      sponsor: req.body.sponsor,
      score: req.body.score,
      judged: 1,
    },
    {
      where: {
        id: req.body.judgingId,
      },
    }
  );

  return res.json({ result });
});

router.post("/update", async (req, res) => {
  const result = await models.Judgings.update(
    {
      teamId: req.body.teamId,
      judgeId: req.body.judgeId,
      startsAt: req.body.startsAt,
      endsAt: req.body.endsAt,
      zoomLink: req.body.zoomLink,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );

  return res.json({ result });
});

router.post("/new", async (req, res) => {
  const result = await models.Judgings.create({
    judgeId: req.body.judgeId,
    teamId: req.body.teamId,
    startsAt: req.body.startsAt,
    endsAt: req.body.endsAt,
    zoomLink: req.body.zoomLink,
    judged: 0,
  });

  return res.json({ result });
});

router.get("/judgeList", async (req, res) => {
  const result = await models.HackerProfile.findAll({
    where: {
      role: "judge",
    },
  });

  return res.json({ result });
});

router.get("/teamList", async (req, res) => {
  const result = await models.Team.findAll({});

  return res.json({ result });
});

router.get("/fullList", async (req, res) => {
  const result = await models.Judgings.findAll({});

  return res.json({ result });
});

module.exports = router;
