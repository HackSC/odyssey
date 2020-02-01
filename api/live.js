// Contains routes the correspond to day of operations

const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");

router.use(utils.authMiddleware);
router.use(utils.requireNonHacker);

const actions = {
  CHECKIN: "checkin",
  CONTRIB: "contrib",
  GROUP_CONTRIB: "groupContrib",
  EMAIL_CONTRIB: "emailContrib",
  IDENTIFY: "identify"
};

router.post("/dispatch", async (req, res) => {
  const { qrCodeId, actionId } = { ...req.body };

  const hackerProfile = await models.HackerProfile.findOne({
    where: { qrCodeId: qrCodeId }
  });

  if (hackerProfile === null) {
    return res.status(404).json({
      error: "No user has been assigned this QR code"
    });
  }
  const userId = hackerProfile.get("userId");

  //TODO: Add sentry logging at the dispatch level
  switch (actionId) {
    case actions.CHECKIN:
      return await handleCheckin(userId, req, res);
    case actions.CONTRIB:
      return await handleContrib(userId, req, res);
    case actions.GROUP_CONTRIB:
      return await handleGroupContrib(userId, req, res);
    case actions.EMAIL_CONTRIB:
      return await handleEmailContrib(userId, req, res);
    case actions.IDENTIFY:
      return await handleIdentify(userId, req, res);
  }
});

/* 
----- Action Dispatchers below, register your action above and implement the appropriate handler below -----
*/

async function handleGroupContrib(userId, req, res) {
  try {
    if (!req.body.taskId) {
      return res.status(400).json({ error: "Bad Request, taskId not found" });
    }
    const result = await models.Person.findOne({
      where: {
        identityId: userId
      },
      include: [
        {
          model: models.ProjectTeam,
          required: false,
          include: [
            {
              model: models.Person,
              required: false
            }
          ]
        }
      ]
    });
    const teammates = result.get("ProjectTeam").get("People");
    const taskId = req.body.taskId;
    const taskMultiplier = getMultiplierForTask(taskId);
    const teammateContribs = teammates.map(tm => {
      const tmId = tm.dataValues.identityId;
      return models.Contribution.create({
        personId: tmId,
        multiplier: taskMultiplier,
        scannerId: req.user.id,
        taskId: taskId
      });
    });

    await Promise.all(teammateContribs);
    return res.json({ success: teammates });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function handleContrib(userId, req, res) {
  const input = req.body;

  const profile = await models.HackerProfile.findByPk(userId);

  if (!input.taskId) {
    return res.status(400).json({ error: "Invalid request" });
  }
  const taskMultiplier = getMultiplierForTask(input.taskId);
  const [result, isCreated] = await models.Contribution.findOrCreate({
    defaults: {
      multiplier: taskMultiplier,
      scannerId: req.user.id
    },
    where: {
      personId: userId,
      taskId: input.taskId
    }
  });
  if (!isCreated) {
    return res.status(400).json({
      error: "User already has completed this task"
    });
  }
  return res.json({
    success: {
      contribution: result,
      message: `Successfully created a task contribution for ${profile.firstName} ${profile.lastName}`
    }
  });
}

async function getMultiplierForTask(taskId) {
  try {
    const result = await models.Task.findOne({
      where: {
        id: taskId
      },

      include: [
        {
          model: models.Grouping,
          required: false,
          include: [
            {
              model: models.Multiplier,
              required: false
            }
          ]
        }
      ]
    });
    const multipliers = result.get("Grouping").get("Multipliers");
    return multipliers.reduce((x, y) => x + y.dataValues.multiplierValue, 0);
  } catch (e) {
    return 1;
  }
}

async function handleEmailContrib(userEmail, req, res) {
  const input = req.body;
  if (!input.taskId) {
    return res.status(400).json({ error: "Requires specified taskId" });
  } else {
    // Try to find a model by email
    const profile = await models.HackerProfile.findOne({
      where: {
        email: userEmail
      }
    });
    const userId = profile.get("userId");
    const taskMultiplier = getMultiplierForTask(input.taskId);
    const [result, isCreated] = await models.Contribution.findOrCreate({
      defaults: {
        multiplier: taskMultiplier,
        scannerId: req.user.id
      },
      where: {
        personId: userId,
        taskId: taskId
      }
    });
    if (!isCreated) {
      return res.status(400).json({
        error: "User already has completed this task"
      });
    }
    return res.json({ success: result });
  }
}

async function handleCheckin(userId, req, res) {
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
    return res.status(400).json({ error: `User has status ${profileStatus}` });
  }

  const [pointsProfile, isCreated] = await models.Person.findOrCreate({
    where: { identityId: userId },
    defaults: { isBattlepassComplete: false }
  });

  if (!isCreated) {
    return res
      .status(400)
      .json({ error: "Hacker has already had a person profile created" });
  }

  const minHouse = await models.House.findOne({
    attributes: [
      ["id", "id"],
      ["name", "name"],
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM persons where persons.houseId = House.id)"
        ),
        "personCount"
      ]
    ],
    order: [[sequelize.literal("personCount"), "ASC"]]
  });

  profile.status = "checkedIn";
  await profile.save();

  pointsProfile.houseId = minHouse.id;
  await pointsProfile.save();

  return res.json({ success: pointsProfile });
}

async function handleIdentify(userId, req, res) {
  const profile = await models.HackerProfile.findOne({
    where: { userId: userId }
  });

  if (profile) {
    return res.json({ success: profile });
  } else {
    return res.status(404).json({ error: "Could not find user" });
  }
}

router.get("/lookup", async (req, res) => {
  const lookupFilter = {};

  const { firstName, lastName, email } = req.query;

  if (!!firstName) {
    lookupFilter["firstName"] = firstName;
  }

  if (!!lastName) {
    lookupFilter["lastName"] = lastName;
  }

  if (!!email) {
    lookupFilter["email"] = email;
  }

  const profiles = await models.HackerProfile.findAll({
    where: lookupFilter
  });

  return res.json({
    success: profiles
  });
});

router.post("/assign-qr", async (req, res) => {
  const { userId, qrCodeId } = req.body;

  if (!!userId && !!qrCodeId) {
    await models.HackerProfile.update(
      {
        qrCodeId: qrCodeId.trim().toUpperCase()
      },
      {
        where: {
          userId
        }
      }
    );

    return res.json({
      success: {
        message: `Updated profile with user ID ${userId} to have the QR Code Id ${qrCodeId}`
      }
    });
  } else {
    return res.status(400).json({
      error: "Missing data, need both userId and qrCodeId"
    });
  }
});

router.get("/identity-check/:userId", async (req, res) => {
  if (req.params.userId) {
    const userId = req.params.userId;
    const profile = await models.HackerProfile.findOne({
      where: { userId: userId }
    });

    if (profile) {
      if (["checkedIn", "confirmed"].includes(profile.status)) {
        return res.json({
          success: {
            firstName: profile.firstName,
            lastName: profile.lastName
          }
        });
      } else {
        return res.status(400).json({
          error: "user cannot be scanned! neither confirmed nor checkedIn"
        });
      }
    } else {
      return res
        .status(404)
        .json({ error: "could not find a profile with that userId" });
    }
  } else {
    return res.status(400).json({ error: "missing user ID" });
  }
});

module.exports = router;
