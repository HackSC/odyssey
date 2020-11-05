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
    console.log(e);
    return res.json({ err: e });
  }
});

router.post("/tasks", async (req, res) => {
  console.log("OTHER");
  console.log(req.body);
  const allowedFields = new Set([
    "blocking",
    "description",
    "points",
    "name",
    "type",
    "isGroupTask",
    "isActive",
    "type",
    "isPast"
  ]);
  const formInput = req.body;
  console.log("forminput");
  console.log(formInput);

  console.log("in /tasks post api");
  console.log(allowedFields);
  console.log(formInput);
  for (let key of Object.keys(formInput)) {
    console.log(key);
    if (!allowedFields.has(key)) {
      console.log("NOT SUPPORTED FIELD");
      console.log(key);
      return res.status(400).json({
        error: `${key} is not a supported field`
      });
    }
  }
  try {
    const result = await models.Task.create(req.body);
    return res.status(200).json({ result: result });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e });
  }
});

router.put("/tasks", async (req, res) => {
  console.log("hit update tasks");
  try {
    // console.log(req.body);
    const updatedObj = req.body;
    if (updatedObj.createdAt === null) {
      updatedObj.createdAt = new Date();
    }
    console.log(updatedObj);
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
