const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

const getProjectTeamForSelf = async (req) => {
  const { id } = req.user;

  const person = await models.Person.findByPk(id, {
    include: [{ model: models.ProjectTeam, required: false }],
  });
  if (person) {
    return person.ProjectTeam;
  }
  return person;
};

const getPersonForQRID = async (qrCodeId) => {
  const hackerProfile = await models.HackerProfile.findOne({
    where: {
      qrCodeId: qrCodeId,
    },
  });
  const userId = hackerProfile.get("userId");
  const person = await models.Person.findByPk(userId);
  return person;
};

router.get("/self", async (req, res) => {
  const ProjectTeam = await getProjectTeamForSelf(req);
  return res.json({ success: ProjectTeam });
});

router.put("/join/:name", async (req, res) => {
  const { name } = req.params;
  let projectTeam = await models.ProjectTeam.findOne({
    where: { name },
  });

  if (!projectTeam) {
    return res.status(400).json({
      error: `Team: ${name} not found`,
    });
  }

  if (projectTeam.Members.length >= 4) {
    return res.status(400).json({ error: "Team is full" });
  }

  await projectTeam.addMember(req.user.id);

  projectTeam = await models.ProjectTeam.findOne({
    where: { name },
  });

  return res.json({ success: projectTeam });
});

router.get("/list", async (req, res) => {
  const projectTeams = await models.ProjectTeam.findAll();
  return res.json({ success: projectTeams });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params.id;
  const projectTeam = await models.ProjectTeam.findByPk(id);
  return res.json({ success: projectTeam });
});

router.post("/self", async (req, res) => {
  const userId = req.user.id;
  const { body } = req;

  const person = await models.Person.findByPk(userId);

  if (person.teamId) {
    return res.status(400).json({ error: "Already has a team" });
  }

  const result = await models.sequelize.transaction(async (t) => {
    const projectTeam = await models.ProjectTeam.create(body, {
      transaction: t,
    });

    await person.setProjectTeam(projectTeam, { transaction: t });
  });

  const projectTeam = await getProjectTeamForSelf(req);

  return res.status(200).json({ success: projectTeam });
});

router.put("/self", async (req, res) => {
  const { body } = req;

  const keys = ["devpostLink", "githubLink", "name"];

  const updateObject = keys.reduce((obj, key) => {
    obj[key] = body[key];
    return obj;
  }, {});

  const projectTeam = await getProjectTeamForSelf(req);
  await projectTeam.update(updateObject);
  await projectTeam.save();

  return res.json({ success: projectTeam });
});

router.post("/self/addPrize/:prizeID", async (req, res) => {
  const { prizeID } = req.params;
  const projectTeam = await getProjectTeamForSelf(req);
  await projectTeam.addPrize(prizeID);
  await projectTeam.save();
  return res.json({ success: projectTeam });
});

router.put("/self/addMember", async (req, res) => {
  const { memberId } = req.body;
  const projectTeam = await getProjectTeamForSelf(req);
  const newTeammate = await getPersonForQRID(memberId);
  projectTeam.addMember(newTeammate);
  await projectTeam.save();
  return res.json({ success: projectTeam });
});

router.delete("/self/deletePrize/:prizeID", async (req, res) => {
  const { prizeID } = req.params;
  let projectTeam = await getProjectTeamForSelf(req);
  let { name } = projectTeam;
  await projectTeam.removePrize(prizeID);
  await projectTeam.save();
  projectTeam = await models.ProjectTeam.findOne({
    where: { name },
  });
  return res.json({ success: projectTeam });
});

router.delete("/self/deleteMember/:memberId", async (req, res) => {
  const { memberId } = req.params;
  const projectTeam = await getProjectTeamForSelf(req);

  await projectTeam.removeMember(memberId);

  //If you remove yourself
  if (req.user.id == memberId) {
    return res.json({ success: null });
  }
  await projectTeam.reload();
  return res.json({ success });
});

module.exports = router;
