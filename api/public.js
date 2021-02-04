const express = require("express");
const cors = require("cors");
const models = require("./models");
const router = express.Router();

router.get("/events/list", cors(), async (req, res) => {
  try {
    const events = await models.Event.findAll({
      order: [
        ["startsAt", "ASC"],
        ["endsAt", "ASC"],
      ],
    });
    return res.json({ events });
  } catch (e) {
    return res.json({ err: e });
  }
});

module.exports = router;
