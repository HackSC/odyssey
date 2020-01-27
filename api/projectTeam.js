const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

const getProjectTeamForSelf = req => {
  const { id } = req.user;

  return models.Person.findByPk(id, {
    include: [{ model: models.ProjectTeam, required: true }]
  }).then(p => p.ProjectTeam);
};

router.get("/self", async (req, res) => {
  try {
    const ProjectTeam = await getProjectTeamForSelf(req);

    return res.json({ projectTeam: ProjectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.put("/join/:name", async (req, res) => {
  try {
    const projectTeam = await models.ProjectTeam.findOne({
      where: { name: req.params.name }
    });
    if (projectTeam.Members.length >= 4) {
      throw new Error("Team is full");
    }
    projectTeam.addMember(req.user.id);
    projectTeam.reload();

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

    const result = await models.sequelize.transaction(async t => {
      const projectTeam = await models.ProjectTeam.create(body, {
        transaction: t
      });

      await person.setProjectTeam(projectTeam, { transaction: t });
    });

    const projectTeam = await getProjectTeamForSelf(req);

    return res.json({ projectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.put("/self", async (req, res) => {
  try {
    const { body } = req;
    const projectTeam = await getProjectTeamForSelf(req);
    await projectTeam.update(body);
    return res.json({ projectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.post("/self/addPrize/:prizeID", async (req, res) => {
  try {
    const { prizeID } = req.params;
    const projectTeam = await getProjectTeamForSelf(req);
    await projectTeam.addPrize(prizeID);
    await projectTeam.reload();
    return res.json({ projectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.delete("/self/deletePrize/:prizeID", async (req, res) => {
  try {
    const { prizeID } = req.params;
    const projectTeam = await getProjectTeamForSelf(req);
    await projectTeam.removePrize(prizeID);
    await projectTeam.reload();
    return res.json({ projectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

router.delete("/self/deleteMember/:memberId", async (req, res) => {
  try {
    const { memberId } = req.params;
    const projectTeam = await getProjectTeamForSelf(req);

    await projectTeam.removeMember(memberId);

    //If you remove yourself
    if (req.user.id == memberId) {
      return res.json({ projectTeam: undefined });
    }
    await projectTeam.reload();
    return res.json({ projectTeam });
  } catch (e) {
    return res.status(400).json({ err: e.message });
  }
});

module.exports = router;
