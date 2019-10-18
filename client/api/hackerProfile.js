const express = require("express");
const models = require("./models");

const router = express.Router();

router.get("/", async (req, res) => {
  const hackerProfiles = await models.HackerProfile.findAll();
  return res.json({ hackerProfiles });
});

router.post("/", async (req, res) => {
  const hackerProfile = await models.HackerProfile.Create(req.body);
  return res.json({ hackerProfile });
});

router.get("/:id", async (req, res) => {
  const hackerProfile = await models.HackerProfile.findByPk(req.param.id);
  return res.json({ hackerProfile });
});

router.put("/:id", async (req, res) => {
  const newHackerProfile = await models.HackerProfile.update(req.body, {
    where: req.params.id
  });
  return res.json({ hackerProfile: newHackerProfile });
});

module.exports = router;
