const express = require("express");
const models = require("./models");
const utils = require("./utils");
const sequelize = require("sequelize");
const { transpileModule } = require("typescript");
const { LexRuntime } = require("aws-sdk");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

// GET /api/matching/team
// - Get pending requests & suggestions
// - Route for the team
router.get("/team/:type", async (req, res) => {
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

  // finding teammate suggestions
  if (req.params.type === "teammate") {
    // if the team is searching, get the hackers who haven't been invited & haven't requested the team
    const hackerProfiles = await models.HackerProfile.findAll({
      where: {
        // year: curruser.year,
        teamId: null,
        status: {
          [sequelize.Op.in]: [
            "submitted",
            "accepted",
            "waitlisted",
            "confirmed",
            "checkedIn",
          ],
        },
        role: "hacker",
        lookingForTeam: true,
      },
      include: [
        {
          model: models.Team,
          as: "requestTeam",
          through: {
            model: models.PendingTeammateRequests,
          },
          required: false,
        },
      ],
      required: true,
    });

    const subtract = await models.HackerProfile.findAll({
      where: {
        // year: curruser.year,
        teamId: null,
        status: {
          [sequelize.Op.in]: [
            "submitted",
            "accepted",
            "waitlisted",
            "confirmed",
            "checkedIn",
          ],
        },
        role: "hacker",
        lookingForTeam: true,
      },
      include: [
        {
          model: models.Team,
          as: "requestTeam",
          through: {
            model: models.PendingTeammateRequests,
            where: {
              teamId: curruser.teamId,
            },
            attributes: [],
          },
          required: true,
        },
      ],
      required: true,
      attributes: ["userId"],
    });

    let subtractArray = [];
    subtract.forEach(function (item, index) {
      subtractArray.push(item.userId);
    });

    let hackerSuggestionsForTeams = [];
    hackerProfiles.forEach(function (item, index) {
      if (!subtractArray.includes(item.userId)) {
        hackerSuggestionsForTeams.push(item);
      }
    });

    if (hackerSuggestionsForTeams) {
      return res.json({ hackerProfiles: hackerSuggestionsForTeams });
    } else {
      return res.json({
        message: "No teammate suggestions",
      });
    }
  }

  // getting pending teammate requests (hackers who've requested to join)
  else if (req.params.type === "pendingRequests") {
    const teammateRequests = await models.HackerProfile.findAll({
      include: [
        {
          model: models.Team,
          as: "requestTeam",
          where: {
            id: curruser.teamId,
          },
          required: true,
          through: {
            model: models.PendingTeammateRequests,
            where: {
              owner: "hacker",
            },
            required: true,
          },
        },
      ],
    });

    if (teammateRequests) {
      return res.json({ hackerProfiles: teammateRequests });
    } else {
      return res.json({
        message: "No pending teammate requests",
      });
    }
  }

  // getting pending teammate invites (hackers whom you've invited)
  else if (req.params.type === "pendingInvites") {
    const teammateRequests = await models.HackerProfile.findAll({
      include: [
        {
          model: models.Team,
          as: "requestTeam",
          where: {
            id: curruser.teamId,
          },
          required: true,
          through: {
            model: models.PendingTeammateRequests,
            where: {
              owner: "team",
            },
            required: true,
          },
        },
      ],
    });

    if (teammateRequests) {
      return res.json({ hackerProfiles: teammateRequests });
    } else {
      return res.json({
        message: "No pending teammate invites",
      });
    }
  }
});

// GET /api/matching/hacker
// - Get pending requests & suggestions
// - Route for the hacker
router.get("/hacker/:type", async (req, res) => {
  // finding teammate suggestions who haven't already been requested
  if (req.params.type === "teammate") {
    const curruser = await models.HackerProfile.findOne({
      where: {
        userId: req.user.id,
      },
    });

    const hackerProfiles = await models.HackerProfile.findAll({
      where: {
        // year: curruser.year,
        teamId: null,
        status: {
          [sequelize.Op.in]: [
            "submitted",
            "accepted",
            "waitlisted",
            "confirmed",
            "checkedIn",
          ],
        },
        role: "hacker",
        lookingForTeam: true,
      },
      required: true,
    });

    if (hackerProfiles) {
      return res.json({ hackerProfiles });
    } else {
      return res.json({
        message: "No teammate suggestions",
      });
    }
  }

  // finding team suggestions that haven't already been requested and haven't invited the current user
  // this query is atrocious but I could not for the life of me figure out an elegant way to use sequelize
  else if (req.params.type === "team") {
    const allTeams = await models.Team.findAll({
      where: {
        lookingForTeammates: true,
      },
      attributes: [
        "id",
        "name",
        "teamCode",
        "ownerId",
        "lookingForTeammates",
        "description",
      ],
    });

    const subtract = await models.Team.findAll({
      where: {
        lookingForTeammates: true,
      },
      include: [
        {
          model: models.HackerProfile,
          through: {
            model: models.PendingTeammateRequests,
            where: {
              hackerProfileId: req.user.id,
            },
            attributes: [],
          },
          required: true,
        },
      ],
      required: true,
      attributes: ["teamCode"],
    });

    let subtractArray = [];
    subtract.forEach(function (item, index) {
      subtractArray.push(item.teamCode);
    });

    let teams = [];
    allTeams.forEach(function (item, index) {
      if (!subtractArray.includes(item.teamCode)) {
        teams.push(item);
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

  // getting all of the user's pending team requests
  else if (req.params.type === "pendingRequests") {
    const teamRequests = await models.Team.findAll({
      include: [
        {
          model: models.HackerProfile,
          where: {
            userId: req.user.id,
          },
          required: true,
          through: {
            model: models.PendingTeammateRequests,
            where: {
              owner: "hacker",
            },
            required: true,
          },
        },
      ],
    });

    if (teamRequests) {
      return res.json({ teams: teamRequests });
    } else {
      return res.json({
        message: "No pending team requests",
      });
    }
  }

  // getting all of the user's pending team invites
  else if (req.params.type === "pendingInvites") {
    const teamRequests = await models.Team.findAll({
      include: [
        {
          model: models.HackerProfile,
          where: {
            userId: req.user.id,
          },
          required: true,
          through: {
            model: models.PendingTeammateRequests,
            where: {
              owner: "team",
            },
            required: true,
          },
        },
      ],
    });

    if (teamRequests) {
      return res.json({ teams: teamRequests });
    } else {
      return res.json({
        message: "No pending team invites",
      });
    }
  }
});

router.post("/request/", async (req, res) => {
  const hackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id },
  });

  // Can't request a team if you're already on one!
  let team = await hackerProfile.getTeam();
  if (team) {
    return res.status(400).json({ message: "User already belongs on a team" });
  }

  // Try to find a team with the provided code
  team = await models.Team.findOne({
    where: { id: req.body.teamId || "" },
  });
  if (!team) {
    return res
      .status(400)
      .json({ message: "Could not find a team with that code" });
  }

  // See if there is still space in the team
  const teamMembers = await team.getMembers();

  if (teamMembers.length + 1 > 4) {
    return res
      .status(400)
      .json({ message: "This team is not looking for teammates!" });
  }

  // request the team
  await models.PendingTeammateRequests.create({
    hackerProfileId: req.user.id,
    teamId: team.id,
    owner: "hacker",
  });

  return res.status(200).json({
    message: "Successfully requested team",
  });
});

router.post("/inviteToTeam/", async (req, res) => {
  const hackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.body.hackerId },
  });

  if (!hackerProfile) {
    return res.status(400).json({ message: "Could not find hacker" });
  }

  // Try to find a team with the provided code
  const team = await models.Team.findOne({
    where: { teamCode: req.body.teamCode || "" },
  });
  if (!team) {
    return res
      .status(400)
      .json({ message: "Could not find a team with that code" });
  }

  // See if there is still space in the team
  const teamMembers = await team.getMembers();

  if (teamMembers.length + 1 > 4) {
    return res.status(400).json({ message: "This team is full!" });
  }

  // request the team
  await models.PendingTeammateRequests.create({
    hackerProfileId: req.body.hackerId,
    teamId: team.id,
    owner: "team",
  });

  return res.status(200).json({
    message: "Successfully invited hacker to team",
  });
});

module.exports = router;
