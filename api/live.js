// Contains routes the correspond to day of operations

const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

router.use(utils.authMiddleware);
router.use(utils.requireNonHacker);

router.get("/battlepass", async (req, res) => {
  return res.json([
    {
      id: "5e29283758c29d352b47dd41",
      isPremium: true,
      pointValue: 38,
      prizeName: "socks"
    },
    {
      id: "5e2928376468ef47d5d4ac3b",
      isPremium: true,
      pointValue: 39,
      prizeName: "socks"
    },
    {
      id: "5e292837285ac2542f28eda9",
      isPremium: true,
      pointValue: 23,
      prizeName: "socks"
    },
    {
      id: "5e2928377f9e491c5bfd71ae",
      isPremium: false,
      pointValue: 30,
      prizeName: "Supreme Brick"
    },
    {
      id: "5e29283727dd79a7ae8f690a",
      isPremium: true,
      pointValue: 22,
      prizeName: "Supreme Brick"
    },
    {
      id: "5e292837493dc9bae67b6495",
      isPremium: false,
      pointValue: 23,
      prizeName: "shoes"
    },
    {
      id: "5e2928373ae0bf5885169106",
      isPremium: false,
      pointValue: 37,
      prizeName: "hat"
    }
  ]);
});

router.get("/personInfo", async (req, res) => {
  try {
    const contribs = await models.Contribution.findAll({
      where: {
        personId: req.user.id
      },
      include: [{ model: models.Task, required: true }],
      attributes: ["id", "createdAt"]
    });

    const person = await models.Person.findOne({
      where: {
        identityId: req.user.id
      }
    });

    return res.json({ contribs, person });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await models.Task.findAll();
    return res.json({ tasks: tasks });
  } catch (e) {
    return res.json({ err: e });
  }
});

router.get("/houseInfo/:id", async (req, res) => {
  const houseId = req.params.id;
  try {
    const house = await models.House.findOne({
      where: {
        id: houseId
      },
      include: [
        {
          model: models.Person,
          include: [
            {
              model: models.Contribution,
              include: [
                {
                  model: models.Task,
                  attributes: ["points"],
                  required: false
                }
              ],
              required: false
            }
          ],
          required: false
        }
      ]
    });
    return res.json({ house });
  } catch (e) {
    return res.json({ err: e.message });
  }
});
router.get("/houseInfo", async (req, res) => {
  try {
    const houses = await models.House.findAll({
      include: [
        {
          model: models.Person,
          include: [
            {
              model: models.Contribution,
              include: [
                {
                  model: models.Task,
                  attributes: ["points"],
                  required: false
                }
              ],
              required: false
            }
          ],
          required: false
        }
      ]
    });
    return res.json({ houses });
  } catch (e) {
    return res.json({ err: e.message });
  }
});

const actions = {
  CHECKIN: "checkin",
  CONTRIB: "contrib",
  GROUP_CONTRIB: "groupContrib",
  EMAIL_CONTRIB: "emailContrib"
};

router.post("/dispatch", async (req, res) => {
  const { userId, actionId } = { ...req.body };

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
  }
});

/* 
----- Action Dispatchers below, register your action above and implement the appropriate handler below -----
*/

async function handleGroupContrib(userId, req, res) {
  try {
    if (!req.body.taskId) {
      return res.status(400).json({ err: "Bad Request, taskId not found" });
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
    const teammateContribs = teammates.map(tm => {
      const tmId = tm.dataValues.identityId;
      return models.Contribution.create({
        personId: tmId,
        taskId: taskId
      });
    });

    await Promise.all(teammateContribs);
    return res.json({ teammates });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
}

async function handleContrib(userId, req, res) {
  const input = req.body;

  const profile = await models.HackerProfile.findByPk(userId);

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

async function handleEmailContrib(userEmail, req, res) {
  const input = req.body;
  if (!input.taskId) {
    return res.status(400).json({ err: "Requires specified taskId" });
  } else {
    try {
      // Try to find a model by email
      const profile = await models.HackerProfile.findOne({
        where: {
          email: userEmail
        }
      });
      const userId = profile.get("userId");
      const result = await models.Contribution.create({
        personId: userId,
        taskId: input.taskId
      });
      return res.json({ contribution: result });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

async function handleCheckin(userId, req, res) {
  try {
    const profile = await models.HackerProfile.findByPk(userId);

    const profileStatus = profile.get("status");
    const invalidStatuses = [
      "unverified",
      "verified",
      "rejected",
      "submitted",
      "checkedIn"
    ];

    if (invalidStatuses.includes(profileStatus)) {
      return res.status(400).json({
        message: `${profile.firstName} ${profile.lastName} has status ${profileStatus}`
      });
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
