const express = require("express");
const cors = require("cors");
const models = require("./models");
const router = express.Router();
const sequelize = require("sequelize");

function validateDomain(url) {
  return url.includes("devpost.com");
}

router.post("/", async (req, res) => {
  // This endpoint will be hit by the slack bot

  const slackId = req.body.user_id;
  const devPostUrl = req.body.text;

  if (!validateDomain(devPostUrl)) {
    return res.json({ text: "Please enter a valid devpost submission link!" });
  } else {
    const link = await models.LinkedSlack.findOne({
      where: { slackId: slackId },
    });

    if (!link) {
      return res.json({
        text: "Please run /checkin first before submitting your project!",
      });
    }
    link.devPostSubmission = devPostUrl;

    link
      .update({
        devPostSubmission: devPostUrl,
      })
      .then(() => {
        console.log("link updated");
      });

    console.log(link);

    return res.json({
      text:
        "Congratulations on submitting your project! If you want to resubmit, run this command again.",
    });
  }
});

module.exports = router;
