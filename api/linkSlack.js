const express = require("express");
const cors = require("cors");
const models = require("./models");
const router = express.Router();

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
    const link = await models.LinkedSlack.create({ slackId: slackId });

    const hacker = await models.HackerProfile.findOne({
      where: {
        email: email,
      },
    });

    if (hacker) {
      hacker
        .update({
          slackProfile: link.id,
        })
        .then((updatedHacker) => {
          console.log(updatedHacker);
        });
    }

    return res.json({ text: "Thanks for checking in! You're ready to go." });
  } else {
    return res.json({ text: "Invalid Slack user." });
  }
});

module.exports = router;
