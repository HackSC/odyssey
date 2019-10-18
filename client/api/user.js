const express = require("express");
const models = require("./models");
const router = express.Router();
const authMiddleware = require("./utils");

router.get("/", authMiddleware, async (req, res) => {
  const users = await models.User.findAll();
  return res.json({ users });
});

router.post("/", authMiddleware, async (req, res) => {
  let sessionUser = req.user;
  console.log("we get here!");
  let user = await models.User.create({
    id: sessionUser.id,
    email: sessionUser._json.email,
    status: "created",
    role: "hacker"
  });
  return res.json({ user });
});

router.get("/:id", authMiddleware, async (req, res) => {
  let user = await models.User.findByPk(req.param.id);
  return res.json({ user });
});

router.put("/:id", authMiddleware, async (req, res) => {
  const user = req.user;
  let newUser = await models.User.update(req.body, { where: user.id });
  return res.json({ user: newUser });
});

module.exports = router;
