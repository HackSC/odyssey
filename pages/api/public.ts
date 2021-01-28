const express = require("express");
const cors = require("cors");
const models = require("./models");
const router = express.Router();

router.post("/events/list", cors(), async (req, res) => {
  try {
    const events = await models.Event.findAll();
    return res.json({ events });
  } catch (e) {
    return res.json({ err: e });
  }
});

export { router };
