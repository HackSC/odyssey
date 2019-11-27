const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

// GET /api/team
// - If a hacker is on a team, get that team info
router.get("/", async (req, res) => {
  const hackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id }
  });

  const team = await hackerProfile.getTeam({
    include: [
      {
        model: models.HackerProfile,
        attributes: ["firstName", "lastName", "status", "email", "userId"]
      }
    ]
  });

  if (team) {
    return res.json({ team });
  } else {
    return res.json({
      message: "User does not currently belong to a team"
    });
  }
});

// GET /api/team/:code
// - If provided a team code, retrieve it
router.get("/:code", async (req, res) => {
  // Try to find a team with the provided code
  const team = await models.Team.findOne({
    where: { teamCode: req.params.code || "" }
  });
  if (!team) {
    return res
      .status(400)
      .json({ message: "Could not find a team with that code" });
  } else {
    return res.json({ team });
  }
});

// POST /api/team
// - If a hacker is not on a team, create a team
router.post("/", async (req, res) => {
  const hackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id }
  });

  let team = await hackerProfile.getTeam();
  if (team) {
    return res.status(500).json({ message: "User already belongs on a team" });
  }

  let generatedCode = Math.random()
    .toString(36)
    .slice(4, 8)
    .toUpperCase();

  while (
    await models.Team.findOne({
      where: { teamCode: generatedCode }
    })
  ) {
    // Regenerate code
    generatedCode = Math.random()
      .toString(36)
      .slice(4, 8)
      .toUpperCase();
  }

  team = await models.Team.create({
    name: req.body.name,
    teamCode: generatedCode,
    ownerId: req.user.id
  });

  await hackerProfile.update({
    teamId: team.id
  });

  return res.json({
    team
  });
});

// POST /api/team/join/:code
// - If a hacker is not on a team, attempt to join a team
router.post("/join/:code", async (req, res) => {
  const hackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id }
  });

  // Can't join a team if you're already on one!
  let team = await hackerProfile.getTeam();
  if (team) {
    return res.status(400).json({ message: "User already belongs on a team" });
  }

  // Try to find a team with the provided code
  team = await models.Team.findOne({
    where: { teamCode: req.params.code || "" }
  });
  if (!team) {
    return res
      .status(400)
      .json({ message: "Could not find a team with that code" });
  }

  // See if there is still space in the team
  const teamMembers = await team.getHackerProfiles();

  if (teamMembers.length + 1 > 4) {
    return res.status(400).json({ message: "This team is full!" });
  }

  // If we're still here, we can join the team :)
  await hackerProfile.setTeam(team);

  return res.status(200).json({
    message: "Successfully joined team"
  });
});

// POST /api/team/leave
// - If a hacker is on a team, attempt to leave that team
router.post("/leave", async (req, res) => {
  const hackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id }
  });

  // Can't leave a team if you're not in one!
  let team = await hackerProfile.getTeam();
  if (!team) {
    return res
      .status(400)
      .json({ message: "User does not currently belong to a team" });
  }

  // Can't leave a team if you own it
  if (team.ownerId === req.user.id) {
    return res
      .status(400)
      .json({ message: "You cannot leave this team, you created it" });
  }

  // If we're still here, we can leave the team :)
  await hackerProfile.update({
    teamId: null
  });

  return res.status(200).json({
    message: "Successfully left team"
  });
});

module.exports = router;
