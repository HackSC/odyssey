const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

// GET /api/matching
// - If a hacker is on a team, get that team info
router.get("/:type", async (req, res) => {
  if (req.params.type === "teammate") {
    const curruser = await models.HackerProfile.findOne({
      where: {
        userId: req.user.id,
      },
    });

    const hackerProfiles = await models.HackerProfile.findAll({
      where: {
        year: curruser.year,
        teamId: null,
        status: "confirmed",
        role: "hacker",
      },
    });

    if (hackerProfiles) {
      return res.json({ hackerProfiles });
    } else {
      return res.json({
        message: "No teammate suggestions",
      });
    }
  }

  else if (req.params.type === "team") {
    const teams = await models.Team.findAll({
      where: {
        lookingForTeammates: true,
      }
    });

    if (teams) {
      return res.json({ teams });
    } else {
      return res.json({
        message: "No team suggestions",
      });
    }
  }
  else if (req.params.type === "pendingTeam") {
    const teamRequests = await models.Team.findAll({
      where: {
        lookingForTeammates: true,
      },
      include: [{
        model: models.HackerProfile,
        where: {
          userId: req.user.id,
        },
        required: true
      }]
    });

    if (teamRequests) {
      return res.json({ teamRequests });
    } else {
      return res.json({
        message: "No pending team requests",
      });
    }
  }
  else if (req.params.type === "pendingTeammate") {
    const curruser = await models.HackerProfile.findOne({
      where: {
        userId: req.user.id,
      },
    });
    if (curruser.teamId === null) {
      return res.json({
        message: "User has no team",
      });
    }
    const teammateRequests = await models.HackerProfile.findAll({
      include: [{
        model: models.Team,
        where: {
          id: curruser.teamId,
        },
        required: true
      }]
    });

    if (teammateRequests) {
      return res.json({ teammateRequests });
    } else {
      return res.json({
        message: "No pending teammate requests",
      });
    }
  }
});

router.post("/request/", async (req, res) => {
  const hackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id }
  });

  // Can't request a team if you're already on one!
  let team = await hackerProfile.getTeam();
  if (team) {
    return res.status(400).json({ message: "User already belongs on a team" });
  }

  // Try to find a team with the provided code
  team = await models.Team.findOne({
    where: { id: req.body.teamId || "" }
  });
  if (!team) {
    console.log("team dne?");
    console.log(req.body.teamId);
    return res
      .status(400)
      .json({ message: "Could not find a team with that code" });
  }

  // See if there is still space in the team
  const teamMembers = await team.getHackerProfiles();

  if (teamMembers.length + 1 > 4 || team.lookingForTeammates === false) {
    return res.status(400).json({ message: "This team is not looking for teammates!" });
  }

  // request the team
  await models.PendingTeammateRequests.create({
    hackerProfileId: req.user.id,
    teamId: team.id
  });

  return res.status(200).json({
    message: "Successfully requested team"
  });
});

export { router };
