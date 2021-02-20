const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const url_route = process.env.URL_BASE + "api/announcements";
  const slackId = req.body.user_id;
  const cmd = req.body.command;
  let announcement = {};

  console.log("Slack Id: ", slackId);
  console.log("Command: ", cmd);
  if (slackId) {
    const target = cmd.replace("/", "").replace(" ", "");
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
      console.log("Command isn't valid")
      announcement["target"] = target;
      announcement["text"] = req.body.text;
      announcement["from"] = req.body.user_name;
      announcement["img"] = "";
    }

    try {
      await fetch(url_route, {
        method: "POST",
        body: JSON.stringify(announcement),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Successfully posted to announcements in db...");
    } catch (error) {
      console.error(error);
      return res.json({ text: "Failed to send Announcement." });
    }
    return res.json({ text: "Announcement sent successfully!" });
  } else {
    return res.json({ text: "Invalid Slack user." });
  }
});

module.exports = router;
