/*
  HackSC 2021 Ticket Raffle
  To ensure a fair raffle, this script calculates how many raffle tickets each hacker has. It creates raffle ticket entires for each hacker, shuffles the tickets, then selects one at random. In the spirit of open source, we have opened up this script to the public to ensure that we are enforcing a fair random raffle.

  To run this script, simply run:
  - node ticketRaffle.js

  This script should output a hacker's name, e-mail, and userId for easy identification
*/

const models = require("../api/models");
const sequelize = require("sequelize");

async function getAllProfiles() {
  const profiles = await models.HackerProfile.findAll({
    where: {
      status: "checkedIn",
    },
  });

  return profiles;
}

async function getTicketsForProfile(userId) {
  const contributions = await models.Contribution.findAll({
    where: {
      personId: userId,
    },
    attributes: [
      [sequelize.fn("SUM", sequelize.col("Task.points")), "totalPoints"],
    ],
    include: [{ model: models.Task, required: true }],
  });

  const person = await models.Person.findByPk(userId);

  if (!person) {
    return 0;
  }

  if (!contributions) {
    return 0;
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

    return totalRafflePoints || 0;
  }
}

async function getTickets(profiles) {
  const tickets = [];

  const x = await Promise.all(
    profiles.map(async (profile) => {
      const ticketCount = await getTicketsForProfile(profile.userId);
      for (let i = 0; i < ticketCount; i++) {
        tickets.push(profile.userId);
      }
    })
  );

  return tickets;
}

async function shuffle(array) {
  await array.sort(() => Math.random() - 0.5);
}

async function getWinner() {
  const profiles = await getAllProfiles();
  const tickets = await getTickets(profiles);

  // Shuffle tickets
  await shuffle(tickets);

  for (let i = 0; i < 20; i++) {
    const winner = await models.HackerProfile.findOne({
      where: {
        userId: tickets[i],
      },
    });
  }
}

getWinner();
