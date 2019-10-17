import express from "express";
import models from "models";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await models.User.findAll();
  return res.json({ users });
});

router.post("/", async (req, res) => {
  let user = await models.User.Create(req.body);
  return res.json({ user });
});

router.get("/:id", async (req, res) => {
  let user = await models.User.findByPk(req.param.id);
  return res.json({ user });
});

router.put("/:id", async (req, res) => {
  let newUser = await models.User.update(req.body, { where: req.params.id });
  return res.json({ user: newUser });
});

export default router;
