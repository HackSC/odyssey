// Contains routes the correspond to day of operations

const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

router.use(utils.authMiddleware);

router.get("/battlepass", async (req, res) => {
  return res.json([
    {
      id: "1",
      isPremium: false,
      pointValue: 8000,
      prizeName: "10 Raffle Tickets"
    },
    {
      id: "2",
      isPremium: false,
      pointValue: 8000,
      prizeName: "HackSC T-Shirt"
    },
    {
      id: "3",
      isPremium: false,
      pointValue: 8000,
      prizeName: "10 Raffle Tickets"
    },
    {
      id: "4",
      isPremium: false,
      pointValue: 8000,
      prizeName: "10 Raffle Tickets"
    },
    {
      id: "5",
      isPremium: false,
      pointValue: 8000,
      prizeName: "10 Raffle Tickets"
    },
    {
      id: "6",
      isPremium: false,
      pointValue: 8000,
      prizeName: "10 Raffle Tickets"
    },
    {
      id: "7",
      isPremium: false,
      pointValue: 8000,
      prizeName: "10 Raffle Tickets"
    },
    {
      id: "8",
      isPremium: false,
      pointValue: 8000,
      prizeName: "HackSC Stickers"
    },
    {
      id: "9",
      isPremium: false,
      pointValue: 8000,
      prizeName: "10 Raffle Tickets"
    },
    {
      id: "10",
      isPremium: false,
      pointValue: 8000,
      prizeName: "Drawstring Bag"
    },
    {
      id: "11",
      isPremium: false,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets"
    },
    {
      id: "12",
      isPremium: true,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets"
    },
    {
      id: "13",
      isPremium: true,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets"
    },
    {
      id: "14",
      isPremium: true,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets"
    },
    {
      id: "15",
      isPremium: true,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets & Travel Reimbursement!"
    },
    {
      id: "16",
      isPremium: true,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets"
    },
    {
      id: "17",
      isPremium: true,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets"
    },
    {
      id: "18",
      isPremium: true,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets"
    },
    {
      id: "19",
      isPremium: true,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets"
    },
    {
      id: "20",
      isPremium: true,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets & Hacker Socks"
    },
    {
      id: "21",
      isPremium: true,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets"
    },
    {
      id: "22",
      isPremium: true,
      pointValue: 8000,
      prizeName: "100 Raffle Tickets & Hacker Hat"
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
    return res.json({ success: tasks });
  } catch (e) {
    return res.json({ error: e });
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

module.exports = router;
