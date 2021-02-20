const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const url_route = process.env.URL_BASE + "api/announcements";
  const slackId = req.body.user_id;
  const cmd = req.body.command;
  let announcement = {};
  let organizer_ids = [
    "U01N1S6214J",
    "U01NVG2GNJV",
    "U01NDPEMFQD",
    "U01NYKU45BN",
    "U01MX41UM9Q",
    "U01NPCJAF7X",
    "U01NFSECVPV",
    "U01P5G8GPC0",
    "U01P6MBPRRN",
    "U01N23B0DE3",
    "U01NUA44R7T",
    "U01NDP9TFFF",
    "U01NLR1KNGY",
    "U01LT1NJ3M2",
    "U01NA34EVT8",
    "U01NMRMB0Q4",
    "U01P6N75QEL",
    "U01NKTTC8J2",
    "U01NRMFTESU",
    "U01NH2NJ3BM",
    "U01NH2MR3EF",
    "U01NA368B8E",
  ];
  if (organizer_ids.indexOf(slackId) > -1) {
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
