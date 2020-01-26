// Contains routes the correspond to day of operations

const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

router.use(utils.authMiddleware);
router.use(utils.requireNonHacker);

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await models.Task.findAll();
    return res.json({ tasks: tasks });
  } catch (e) {
    return res.json({ err: e });
  }
});

const actions = {
  CHECKIN: "checkin",
  CONTRIB: "contrib"
};

router.post("/dispatch", async (req, res) => {
  const { userId, actionId } = { ...req.body };

  //TODO: Add sentry logging at the dispatch level
  switch (actionId) {
    case actions.CHECKIN:
      return await handleCheckin(userId, req, res);
    case actions.CONTRIB:
      return await handleContrib(userId, req, res);
  }
});

/* 
----- Action Dispatchers below, register your action above and implement the appropriate handler below -----
*/

async function handleContrib(userId, req, res) {
  const input = req.body;

  const profile = await models.HackerProfile.findOne({
    where: { userId: userId }
  });

  if (!input.taskId) {
    return res.status(400).json({ message: "Invalid request" });
  } else {
    try {
      const result = await models.Contribution.build({
        personId: userId,
        taskId: input.taskId
      }).save();
      return res.json({
        contribution: result,
        message: `Successfully created a task contribution for ${profile.firstName} ${profile.lastName}`
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}

async function handleCheckin(userId, req, res) {
  try {
    const profile = await models.HackerProfile.findOne({
      where: { userId: userId }
    });
    const profileStatus = profile.get("status");
    const invalidStatuses = [
      "unverified",
      "verified",
      "rejected",
      "submitted",
      "checkedIn"
    ];

    if (invalidStatuses.includes(profileStatus)) {
      return res
        .status(400)
        .json({ message: `User has status ${profileStatus}` });
    }

    const result = await models.House.findAll({
      raw: true,
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("People.identityId")),
            "personCount"
          ]
        ]
      },
      include: [
        {
          model: models.Person,
          attributes: []
        }
      ]
    });

    // Should sort result in ascending order (lowest personCount first)
    result.sort(function(a, b) {
      return a.personCount - b.personCount;
    });

    const pointsProfile = await models.Person.create({
      identityId: userId,
      houseId: result[0].id,
      isBattlepassComplete: false
    });

    await models.HackerProfile.update(
      { status: "checkedIn" },
      { where: { userId: userId } }
    );

    return res.json({
      pointsProfile,
      profile,
      message: `Successfully checked in ${profile.firstName} ${profile.lastName}`
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

module.exports = router;
