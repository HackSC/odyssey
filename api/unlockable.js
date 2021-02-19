const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

/* This router supports superuser routes, such as updating the status of users */

router.use(utils.authMiddleware);
router.use(utils.requireAdmin);

router.get("/list", async (req, res) => {
  try {
    const unlockables = await models.Unlockable.findAll();
    return res.json({ unlockables });
  } catch (e) {
    return res.json({ err: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const unlockable = await models.Unlockable.create({
      tier: parseInt(req.body.tier),
      isPremium: req.body.isPremium,
      pointThreshold: parseInt(req.body.pointThreshold),
    });
    return res.json({ unlockable });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const unlockableId = req.body.id;
    delete req.body.id;
    const unlockable = await models.Unlockable.update(
      {
        ...req.body,
      },
      { where: { id: unlockableId } }
    );
    return res.json({ unlockable });
  } catch (e) {
    return res.json({ err: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const unlockableId = req.params.id;
    await models.Unlockable.destroy({ where: { id: unlockableId } });
    return res.status(200).json({ result: "success" });
  } catch (e) {
    return res.json({ err: e.message });
  }
});

module.exports = router;
