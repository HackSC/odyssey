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
        prizeName: "100 Raffle Tickets & Travel Reimbursement!"
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
        prizeName: "100 Raffle Tickets"
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
        model: models.Person,
        as: "HouseMembers",
        required: false
      }
    ]
  });
  return res.json({ success: houses });
});

router.get("/houseInfo/:id", async (req, res) => {
  const houseId = req.params.id;
  const house = await models.House.findByPk(houseId, {
    include: [
      {
        model: models.Person,
        as: "HouseMembers"
      }
    ]
  });
  return res.json({ success: house });
});

module.exports = router;
