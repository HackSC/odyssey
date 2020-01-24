const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

router.get("/self", async (req, res) => {
  try {
    const { id } = req.user;

    const person = await models.Person.findByPk(id, {
      include: [{ model: models.ProjectTeam, required: true }]
    });

    return res.json({ projectTeam: person.ProjectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.put("/join/:name", async (req, res) => {
  try {
    const projectTeam = await models.ProjectTeam.findOne({
      where: { name: req.params.name },
      include: [models.Person]
    });
    if (projectTeam.People.length >= 4) {
      throw new Error("Team is full");
    }
    projectTeam.addPerson(req.user.id);

    return res.json({ projectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.get("/list", async (req, res) => {
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
    const projectTeam = await models.ProjectTeam.findByPk(id);
    return res.json({ projectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

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
