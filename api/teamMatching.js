const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

// GET /api/matching
// - If a hacker is on a team, get that team info
router.get("/", async (req, res) => {
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
    // include: [
    //   {
    //     model: models.HackerProfile,
    //     attributes: [
    //       "firstName",
    //       "lastName",
    //       "status",
    //       "email",
    //       "userId",
    //       "year",
    //       "major",
    //       "skills",
    //       "school",
    //     ],
    //   },
    // ],
  });

  if (hackerProfiles) {
    return res.json({ hackerProfiles });
  } else {
    return res.json({
      message: "No teammate suggestions",
    });
  }
});

module.exports = router;
