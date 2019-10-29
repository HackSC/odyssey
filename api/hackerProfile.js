const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

router.get("/", async (req, res) => {
  const hackerProfile = await models.HackerProfile.findAll({
    where: {
      userId: req.user.id
    }
  });
  return res.json({ hackerProfile });
});

router.post("/", async (req, res) => {
  const hackerProfile = await models.HackerProfile.create({
    userId: req.user.id,
    email: req.user._json.email,
    ...req.body
  });
  return res.json({ hackerProfile });
});

router.put("/", async (req, res) => {
  const newHackerProfile = await models.HackerProfile.update(req.body, {
    where: {
      userId: req.user.id
    }
  });
  return res.json({ hackerProfile: newHackerProfile });
});

module.exports = router;
