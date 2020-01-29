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

module.exports = router;
