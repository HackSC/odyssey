// Contains routes the correspond to day of operations

const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");

router.use(utils.authMiddleware);

router.get("/battlepass", async (req, res) => {
  return res.json({
    success: [
      {
        id: "1",
        isPremium: false,
        pointValue: 6000,
        prizeName: "10 Raffle Tickets",
      },
      {
        id: "2",
        isPremium: false,
        pointValue: 6000,
        prizeName: "HackSC T-Shirt",
      },
      {
        id: "3",
        isPremium: false,
        pointValue: 6000,
        prizeName: "10 Raffle Tickets",
      },
      {
        id: "4",
        isPremium: false,
        pointValue: 6000,
        prizeName: "10 Raffle Tickets",
      },
      {
        id: "5",
        isPremium: false,
        pointValue: 6000,
        prizeName: "10 Raffle Tickets",
      },
      {
        id: "6",
        isPremium: false,
        pointValue: 6000,
        prizeName: "10 Raffle Tickets",
      },
      {
        id: "7",
        isPremium: false,
        pointValue: 6000,
        prizeName: "10 Raffle Tickets",
      },
      {
        id: "8",
        isPremium: false,
        pointValue: 6000,
        prizeName: "HackSC Stickers",
      },
      {
        id: "9",
        isPremium: false,
        pointValue: 6000,
        prizeName: "10 Raffle Tickets",
      },
      {
        id: "10",
        isPremium: false,
        pointValue: 6000,
        prizeName: "Drawstring Bag",
      },
      {
        id: "11",
        isPremium: false,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets",
      },
      {
        id: "12",
        isPremium: true,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets & Travel Reimbursement!",
      },
      {
        id: "13",
        isPremium: true,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets",
      },
      {
        id: "14",
        isPremium: true,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets",
      },
      {
        id: "15",
        isPremium: true,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets",
      },
      {
        id: "16",
        isPremium: true,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets",
      },
      {
        id: "17",
        isPremium: true,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets",
      },
      {
        id: "18",
        isPremium: true,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets",
      },
      {
        id: "19",
        isPremium: true,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets",
      },
      {
        id: "20",
        isPremium: true,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets & Hacker Socks",
      },
      {
        id: "21",
        isPremium: true,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets",
      },
      {
        id: "22",
        isPremium: true,
        pointValue: 6000,
        prizeName: "100 Raffle Tickets & Hacker Hat",
      },
    ],
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

router.get("/event/list", async (req, res) => {
  try {
    const events = await models.Event.findAll();
    return res.json({ success: events });
  } catch (e) {
    return res.json({ error: e });
  }
});

router.get("/houseInfo/list", async (req, res) => {
  const houses = await models.House.findAll({
    include: [
      {
        model: models.Person.scope("hideProfile"),
        as: "HouseMembers",
        required: false,
      },
    ],
  });
  return res.json({ success: houses });
});

router.get("/houseInfo/:id", async (req, res) => {
  const houseId = req.params.id;
  const house = await models.House.findByPk(houseId, {
    include: [
      {
        model: models.Person,
        as: "HouseMembers",
      },
    ],
  });
  return res.json({ success: house });
});

router.get("/incompleteTasks", async (req, res) => {
  const allTasks = await models.Task.findAll();
  const completedTasks = await models.Contribution.findAll({
    where: {
      personId: req.user.id,
    },
  });
  if (!completedTasks) {
    return res.json({ success: allTasks });
  }
  const completeTaskIds = completedTasks.map((x) => {
    return x.get("Task").get("id");
  });

  const incompleteTasks = allTasks.filter((x) => {
    const taskId = x.get("id");
    return !completeTaskIds.includes(taskId);
  });

  return res.json({ success: incompleteTasks });
});

router.get("/rafflePoints", async (req, res) => {
  const contributions = await models.Contribution.findAll({
    where: {
      personId: req.user.id,
    },
    attributes: [
      [sequelize.fn("SUM", sequelize.col("Task.points")), "totalPoints"],
    ],
    include: [{ model: models.Task, required: true }],
  });

  const person = await models.Person.findByPk(req.user.id);

  if (!person) {
    return res.status(404).json({ error: "Hacker Person Profile Not Found" });
  }

  if (!contributions) {
    return res.status(404).json({ error: "Hacker Points Not Found" });
  } else {
    const totalPoints = parseInt(contributions[0].get("totalPoints"));
    const isPersonBPComplete = person.get("isBattlepassComplete") || 0;

    const houseTier = Math.min(Math.floor(totalPoints / 6000), 10);
    const tierPoints = [10, 10, 20, 30, 40, 50, 60, 60, 70, 70, 170];
    const premiumTierPoints = [
      100,
      200,
      300,
      400,
      500,
      600,
      700,
      800,
      900,
      1000,
      11000,
    ];

    let totalRafflePoints =
      isPersonBPComplete == 0
        ? tierPoints[houseTier]
        : tierPoints[houseTier] + premiumTierPoints[houseTier];

    const houseId = person.houseId || 0;

    if (houseId === 6) {
      totalRafflePoints += 1000;
    } else if (houseId === 5) {
      totalRafflePoints += 500;
    } else if (houseId === 4) {
      totalRafflePoints += 250;
    } else if (houseId === 3) {
      totalRafflePoints += 100;
    }

    return res.json({
      success: {
        totalRafflePoints,
      },
    });
  }
});

export { router };
