const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

/* This router supports superuser routes, such as updating the status of users */

router.use(utils.authMiddleware);

router.get("/list", utils.requireNonHacker, async (req, res) => {
  const Op = sequelize.Op;
  let filter = [];

  if (req.user.role && req.user.role === "admin") {
    filter.push({
      type: "admin",
    });
    filter.push({
      type: "volunteer",
    });
    filter.push({
      type: "sponsor",
    });
  } else if (req.user.role && req.user.role === "volunteer") {
    filter.push({
      type: "volunteer",
    });
    filter.push({
      type: "sponsor",
    });
  } else if (req.user.role && req.user.role === "sponsor") {
    filter.push({
      type: "sponsor",
    });
  }

  const tasks = await models.Task.findAll({
    where: {
      [Op.or]: filter,
    },
  });

  return res.json({ success: tasks });
});

router.post("/create", utils.requireAdmin, async (req, res) => {
  const allowedFields = new Set([
    "blocking",
    "description",
    "points",
    "name",
    "isGroupTask",
    "isActive",
  ]);
  const formInput = req.body;

  for (let key of Object.keys(formInput)) {
    if (!allowedFields.has(key)) {
      return res.status(400).json({
        error: `${key} is not a supported field`,
      });
    }
  }
  const result = await models.Task.create(req.body);
  return res.status(200).json({ success: result });
});

router.put("/:id", utils.requireAdmin, async (req, res) => {
  const updatedObj = req.body;
  const taskId = updatedObj.id;
  delete updatedObj.id;
  await models.Task.update({ ...updatedObj }, { where: { id: taskId } });
  return res.status(200);
});

router.delete("/:id", utils.requireAdmin, async (req, res) => {
  const id = req.params.id;
  await models.Task.destroy({
    where: {
      id: id,
    },
  });
  return res.json({ success: null });
});

export { router };
