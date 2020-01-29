const express = require("express");
const models = require("./models");
const router = express.Router();
const utils = require("./utils");

router.use(utils.authMiddleware);

router.get("/", async (req, res) => {
  const prizes = await models.Prize.findAll();
  return res.json({ success: prizes });
});

module.exports = router;
