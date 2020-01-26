const express = require("express");
const models = require("./models");
const router = express.Router();
const utils = require("./utils");

router.use(utils.authMiddleware);

router.get("/", async (req, res) => {
  try {
    const prizes = await models.Prize.findAll();
    return res.json({ prizes });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

module.exports = router;
