// Contains routes the correspond to day of operations

const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);

router.get("/battlepass", async (req, res) => {
  return res.json({
    success: [
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
    ]
  });
});

//TODO: Figure out why this route exists
router.get("/personInfo", async (req, res) => {
  const person = await models.Person.findByPk(req.user.id);
  return res.json({ success: person });
});

router.get("/tasks", async (req, res) => {
  const tasks = await models.Task.findAll();
  return res.json({ success: tasks });
});

router.get("/houseInfo/:id", async (req, res) => {
  const houseId = req.params.id;
  const house = await models.House.findByPk(houseId, {
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
  return res.json({ success: house });
});

router.get("/houseInfo/list", async (req, res) => {
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
  return res.json({ success: houses });
});

module.exports = router;
