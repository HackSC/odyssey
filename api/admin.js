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
    console.log("WE GET HERE");
    const allProfiles = await models.HackerProfile.findAll();

    allProfiles.forEach(async profile => {
      console.log(profile);
      const reviews = await profile.getHackerReviews();
      console.log(reviews.length);
    });
    return res.json({ ids: validProfiles });
    // Create a new review, with the req.user email on it
    // Send that review down, along with the ID so it can be
    // 		Added to later
    // Return
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e });
  }
});

module.exports = router;
