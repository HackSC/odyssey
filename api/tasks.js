const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

/* This router supports superuser routes, such as updating the status of users */

router.use(utils.authMiddleware);
router.use(utils.requireAdmin);

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await models.Task.findAll();
    return res.json({ tasks: tasks });
  } catch (e) {
    return res.json({ err: e });
  }
});

router.post("/tasks", async (req, res) => {
  const allowedFields = new Set([
    "blocking",
    "description",
    "points",
    "name",
    "isGroupTask",
    "type"
  ]);
  const formInput = req.body;

  for (let key of Object.keys(formInput)) {
    if (!allowedFields.has(key)) {
      return res.status(400).json({
        error: `${key} is not a supported field`
      });
    }
  }
  try {
    const result = await models.Task.create(req.body);
    return res.status(200).json({ result: result });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.put("/tasks", async (req, res) => {
  try {
    const updatedObj = req.body;
    const taskId = updatedObj.id;
    delete updatedObj.id;
    await models.Task.update({ ...updatedObj }, { where: { id: taskId } });
    return res.status(200);
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await models.Task.destroy({
      where: {
        id: id
      }
    });
    return res.status(200);
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

module.exports = router;
