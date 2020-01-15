// Contains routes the correspond to day of operations

const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

router.use(utils.authMiddleware);
router.use(utils.requireNonHacker);

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await models.Task.findAll();
    return res.json({ tasks: tasks });
  } catch (e) {
    return res.json({ err: e });
  }
});

const actions = {
  CHECKIN: "checkin"
};

router.post("/dispatch", async (req, res) => {
  const { userId, actionId } = { ...req.body };
  switch (actionId) {
    case actions.CHECKIN:
      return handleCheckin(userId, req, res);
  }
});

/* 
----- Action Dispatchers below, register your action above and implement the appropriate handler below -----
*/

function handleCheckin(userId, req, res) {
  //TODO: Implement this function
  // Create person row to instantiate user in points system
  // Set their status to "checkedIn"
  // Assign a house
  return res.json({ checkIn: "success" });
}

module.exports = router;
