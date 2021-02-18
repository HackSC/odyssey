const express = require("express");
const cors = require("cors");
const models = require("./models");
const router = express.Router();
const sequelize = require("sequelize");

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

router.post("/", async (req, res) => {
  // This endpoint will be hit by the slack bot

  const slackId = req.body.user_id;
  const email = req.body.text;

  if (!validateEmail(email)) {
    return res.json({ text: "Please enter a valid email address!" });
  }

  if (slackId) {
    //if link already exists, don't check in again
    const linkExists = await models.LinkedSlack.findOne({
      where: { slackId: slackId },
    });

    if (linkExists) {
      return res.json({ text: "You're already checked in" });
    }

    const link = await models.LinkedSlack.create({ slackId: slackId });
    if(link) {
      link.update({
        checkInTime: new Date()
      })
      .then((updatedLink) => {
        console.log(updatedLink.checkInTime);
      })
    }

    const hacker = await models.HackerProfile.findOne({
      where: {
        email: email,
      },
    });

    if (hacker) {
      hacker
        .update({
          slackProfile: slackId
        })
        .then((updatedHacker) => {
          console.log("hacker updated");
        });
    }

    const [pointsProfile, isCreated] = await models.Person.findOrCreate({
      where: { identityId: hacker.userId },
      defaults: { isBattlepassComplete: false },
    });

    if (!isCreated) {
      return res.json({ text: "You're already checked in" });
    }

    const minHouse = await models.House.findOne({
      attributes: [
        ["id", "id"],
        ["name", "name"],
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM persons where persons.houseId = House.id)"
          ),
          "personCount",
        ],
      ],
      order: [[sequelize.literal("personCount"), "ASC"]],
    });

    hacker.status = "checkedIn";
    await hacker.save();

    pointsProfile.houseId = minHouse.id;
    await pointsProfile.save();

    console.log(pointsProfile);
    return res.json({ text: "Thanks for checking in! You're ready to go." });
  } else {
    return res.json({ text: "Invalid Slack user." });
  }
});

module.exports = router;
