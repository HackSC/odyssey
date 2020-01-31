const express = require("express");
const models = require("./models");
const router = express.Router();

router.get("/events/list", async (req, res) => {
  try {
    const events = await models.Event.findAll();
    return res.json({ events });
  } catch (e) {
    return res.json({ err: e });
  }
});

module.exports = router;
