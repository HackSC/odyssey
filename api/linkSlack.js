const express = require("express");
const cors = require("cors");
const utils = require("./utils");
const models = require("./models");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.requireNonHacker);

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

  const link = await models.linkedSlack.create({ slackId: slackId });

  const hackers = await models.HackerProfile.findAll({
    where: {
      email: email,
    },
  }).on("success", function (hacker) {
    if (hacker) {
      hacker.update({
        slackProfile: link.id,
      });
    }
  });

  return res.json({ text: "Thanks for checking in! You're ready to go." });
});

module.exports = router;
