const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

/* This router supports superuser routes, such as updating the status of users */

router.use(utils.authMiddleware);

router.get("/self", async (req, res) => {
  try {
    const pointsProfile = await models.Person.findOrCreate({
      where: {
        identityId: req.user.id
      },
      defaults: { isBattlepassComplete: false }
    });

    return res.json({ person: pointsProfile });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e.message });
  }
});

module.exports = router;
