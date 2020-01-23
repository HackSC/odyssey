const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

router.get("/self", async (req, res) => {
  try {
    const { id } = req.user.id;

    const person = await models.Person.findById(id);

    const projectTeam = await models.ProjectTeam.findById(person.teamId);

    return res.json({ projectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.put("/self", async (req, res) => {});

router.get("/", async (req, res) => {
  try {
    const projectTeams = await models.ProjectTeam.findAll();
    return res.json({ projectTeams });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params.id;

    const projectTeam = await models.ProjectTeam.findById(id);

    return res.json({ projectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.put("/:id", async (req, res) => {});

router.post("/self", async (req, res) => {
  try {
    const userId = req.user.id;
    const { body } = req;

    const person = await models.Person.findByPk(userId);

    if (person.teamId) {
      return res.status(400).json({ err: "Already has a team" });
    }
    let projectTeam;

    const result = await models.sequelize.transaction(async t => {
      projectTeam = await models.ProjectTeam.create(body, {
        transaction: t
      });

      await person.setProjectTeam(projectTeam, { transaction: t });
    });
    return res.json({ projectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

module.exports = router;
