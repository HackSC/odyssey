const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const sequelize = require("sequelize");
const Sentry = require("@sentry/node");

/* This router supports superuser routes, such as updating the status of users */

router.use(utils.authMiddleware);
router.use(utils.requireAdmin);

// Full write access to a user's hackerProfile
router.put("/:email", async (req, res) => {
  const updatedhackerProfile = await models.HackerProfile.update(req.body, {
    where: {
      email: req.params.email
    }
  });
  return res.json({ hackerProfile: newHackerProfile });
});

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await models.HackerReview.findAll();
    return res.json({ reviews: reviews });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

router.get("/review", async (req, res) => {
  try {
    // find a review w < 3 reviews
    // Create a new review, with the req.user email on it
    // Send that review down, along with the ID so it can be
    // 		Added to later
    // Return
    const profilesWCount = await models.HackerProfile.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("HackerReviews.id")),
            "reviewCount"
          ]
        ]
      },
      include: [
        {
          model: models.HackerReview,
          attributes: []
        }
      ],
      group: ["HackerProfile.userId"]
    });

    const acceptableProfile = profilesWCount.find(profile => {
      return profile.dataValues.reviewCount < 3;
    });
    if (acceptableProfile) {
      // Create a new review, and update

      const newProfile = await models.HackerReview.create({
        hackerId: acceptableProfile.dataValues.userId,
        createdBy: req.user.id
      });

      return res.json({
        review: newProfile,
        profile: acceptableProfile
      });
    } else {
      return res.json({ review: null, profile: null }); // Returns empty when there are no more profiles
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e });
  }
});

module.exports = router;
