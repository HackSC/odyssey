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
  const slackId = req.body.user_id;
  const cmd = req.body.command;

  if (slackId) {
    const target = cmd.replace("/", "");
    let roles = [
      "hacker",
      "admin",
      "sponsor",
      "volunteer",
      "superadmin",
      "judge",
    ];

    let isValid = false;
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] == target) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      responseText =
        "Your command was not valid. \
            Please ensure you're using one of the following commands: \
            /hacker, /admin, /sponsor, /volunteer, /superadmin, /judge";
      return responseText;
    } else {
      announcement["target"] = target;
      announcement["text"] = request.body.text;
      announcement["from"] = request.body.user_name;
      announcement["img"] = "";
    }

    try {
      let url_route = req
        ? process.env.URL_BASE + "api/announcements"
        : "/api/announcements";
      await fetch(url_route, {
        method: "POST",
        body: JSON.stringify(announcement),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
      return res.json({ text: "Failed to send Announcement." });
    }
    return res.json({ text: "Thanks for checking in! You're ready to go." });
  } else {
    return res.json({ text: "Invalid Slack user." });
  }
});

module.exports = router;
