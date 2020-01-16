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
  CHECKIN: "checkin"
};

router.post("/dispatch", async (req, res) => {
  const { userId, actionId } = { ...req.body };
  switch (actionId) {
    case actions.CHECKIN:
      return await handleCheckin(userId, req, res);
  }
});

/* 
----- Action Dispatchers below, register your action above and implement the appropriate handler below -----
*/

async function handleCheckin(userId, req, res) {
  try {
    const pointsProfile = await models.Person.findOrCreate({
      where: {
        identityId: userId
      },
      defaults: { isBattlepassComplete: false }
    });

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
        .json({ invalid: `User has status ${profileStatus}` });
    }

    await models.HackerProfile.update(
      { status: "checkedIn" },
      { where: { userId: userId } }
    );

    return res.json({ person: profile });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
}

module.exports = router;
