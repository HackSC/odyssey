const express = require("express");
const models = require("./models");
const authMiddleware = require("./utils");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const hackerProfiles = await models.HackerProfile.findAll();
  return res.json({ hackerProfiles });
});

router.post("/", authMiddleware, async (req, res) => {
  console.log(req.user.id);
  const hackerProfile = await models.HackerProfile.create({
    userId: req.user.id,
    gender: "male",
    major: "computer science",
    resume: "bro file uploads?",
    skills: "none",
    interests: "snowboarding"
  });
  return res.json({ hackerProfile });
});

router.put("/", authMiddleware, async (req, res) => {
  const newHackerProfile = await models.HackerProfile.update(req.body, {
    where: req.params.id
  });
  return res.json({ hackerProfile: newHackerProfile });
});

module.exports = router;
