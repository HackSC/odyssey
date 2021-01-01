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
// Variable parameters in the foremost endpoint path restricts use to just this route.
// Consider changing route as to not use up all single-path put requests
router.put("/:email", async (req, res) => {
  const updatedhackerProfile = await models.HackerProfile.update(req.body, {
    where: {
      email: req.params.email,
    },
  });
  return res.json({ hackerProfile: newHackerProfile });
});

// TODO: use the new client fetcher api
router.get("/profiles", async (req, res) => {
  const Op = sequelize.Op;
  const { query } = req.query;
  const flexQuery = "%" + query + "%";
  try {
    const profiles = await models.HackerProfile.findAll({
      where: {
        [Op.or]: [
          {
            email: {
              [Op.like]: flexQuery,
            },
          },
          {
            firstName: {
              [Op.like]: flexQuery,
            },
          },
          {
            lastName: {
              [Op.like]: flexQuery,
            },
          },
        ],
      },
      limit: 50,
    });
    return res.json({
      profiles,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.post("/updateRole", async (req, res) => {
  try {
    const { email, role } = req.body;
    const result = await models.HackerProfile.update(
      {
        role: role,
      },
      {
        where: {
          email: email,
        },
      }
    );

    return res.json({ success: result });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.post("/updateHackerStatus", async (req, res) => {
  try {
    const { email, status } = req.body;

    // TODO: Check is status input is in enum, otherwise we have bad status update requests
    const result = await models.HackerProfile.update(
      {
        status: status,
      },
      {
        where: {
          email: email,
        },
      }
    );

    return res.json({ success: result });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.get("/all-reviews", async (req, res) => {
  try {
    const reviews = await models.HackerReview.findAll({
      include: [
        {
          model: models.HackerProfile,
        },
      ],
    });
    var reviewedProfiles = [];
    for (const review of reviews) {
      let profile = await models.HackerProfile.findAll({
        where: {
          userId: review.dataValues.hackerId,
        },
      });
      let ReviewedProfile = { ReviewedProfile: profile[0] };
      reviewedProfiles.push(
        Object.assign({}, review.dataValues, ReviewedProfile)
      );
    }

    return res.json({ reviews: reviewedProfiles });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

router.get("/reviews", async (req, res) => {
  try {
    const { count } = req.query;
    if (!(count >= 0)) count = 10;

    const reviews = await models.HackerReview.findAll({
      include: [
        {
          model: models.HackerProfile,
        },
      ],
    });

    reviews.sort((review_a, review_b) => {
      return new Date(review_a.createdAt).getTime() >
        new Date(review_b.createdAt).getTime()
        ? -1
        : 1;
    });

    var reviewedProfiles = [];
    for (const review of reviews.slice(0, count)) {
      let profile = await models.HackerProfile.findAll({
        where: {
          userId: review.dataValues.hackerId,
        },
      });
      let ReviewedProfile = { ReviewedProfile: profile[0] };
      reviewedProfiles.push(
        Object.assign({}, review.dataValues, ReviewedProfile)
      );
    }

    return res.json({ reviews: reviewedProfiles });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

router.get("/admin-reviews", async (req, res) => {
  try {
    const Op = sequelize.Op;
    const admins = await models.HackerProfile.findAll({
      where: {
        role: {
          [Op.or]: ["admin", "superadmin"],
        },
      },
    });
    var adminReviews = [];

    for (const admin of admins) {
      let reviews = await models.HackerReview.findAll({
        where: {
          createdBy: admin.userId,
        },
      });

      let admin_obj = Object.assign(
        {},
        { hacker_reviews: reviews },
        admin.dataValues
      );
      adminReviews.push(admin_obj);
    }

    return res.json({ reviews: adminReviews });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

router.get("/reviewHistory", async (req, res) => {
  try {
    const reviews = await models.HackerReview.findAll({
      where: {
        createdBy: req.user.id,
      },
    });
    return res.json({ reviews: reviews });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

router.put("/review/:id", async (req, res) => {
  const requestId = req.params.id;
  const allowedFields = new Set([
    "scoreOne",
    "scoreTwo",
    "scoreThree",
    "comments",
  ]);
  const formInput = req.body;

  for (let key of Object.keys(formInput)) {
    if (!allowedFields.has(key)) {
      return res.status(400).json({
        error: `${key} is not a supported field`,
      });
    }
  }

  try {
    const result = await models.HackerReview.update(req.body, {
      where: {
        id: requestId,
      },
    });

    return res.json({ update: result });
  } catch (e) {
    return res.status(500).json({
      error: e,
    });
  }
});

router.get("/numberSubmittedApps", async (req, res) => {
  try {
    const allProfiles = await models.HackerProfile.findAll({
      where: {
        submittedAt: {
          [sequelize.Op.not]: null,
        },
      },
      include: [
        {
          model: models.HackerReview,
        },
      ],
    });
    return res.json({
      numberSubmittedApps: allProfiles,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.get("/eligibleProfiles", async (req, res) => {
  try {
    const allProfiles = await models.HackerProfile.findAll({
      where: {
        submittedAt: {
          [sequelize.Op.not]: null,
        },
      },
      include: [
        {
          model: models.HackerReview,
        },
      ],
    });
    filteredProfiles = allProfiles.filter((profile) => {
      const reviewsByCurrUser = profile.HackerReviews.filter((review) => {
        return review.dataValues.createdBy === req.user.id;
      });
      return reviewsByCurrUser.length === 0 && profile.HackerReviews.length < 1;
    });
    return res.json({
      eligibleReviews: filteredProfiles,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.get("/reviewedProfiles", async (req, res) => {
  try {
    const { count } = req.query;
    if (!(count >= 0)) count = 10;
    const allProfiles = await models.HackerProfile.findAll({
      where: {
        submittedAt: {
          [sequelize.Op.not]: null,
        },
      },
      include: [
        {
          model: models.HackerReview,
        },
      ],
    });

    let filteredProfiles = allProfiles
      .filter((profile) => {
        return profile.HackerReviews.length > 0;
      })
      .slice(0, count);

    return res.json({
      reviewedProfiles: filteredProfiles,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.post("/review", async (req, res) => {
  try {
    const formBody = req.body;
    const newReview = await models.HackerReview.create({
      hackerId: formBody.userId,
      createdBy: req.user.id,
      scoreOne: formBody.scoreOne,
      scoreTwo: formBody.scoreTwo,
      scoreThree: formBody.scoreThree,
      comments: formBody.comments,
    });

    return res.json({ newReview: newReview });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

router.get("/review", async (req, res) => {
  try {
    const profilesWCount = await models.HackerProfile.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("HackerReviews.id")),
            "reviewCount",
          ],
        ],
      },
      include: [
        {
          model: models.HackerReview,
          attributes: [],
        },
      ],
      group: ["HackerProfile.userId"],
    });

    const acceptableProfile = profilesWCount.find((profile) => {
      return profile.dataValues.reviewCount < 1;
    });
    if (acceptableProfile) {
      const newReview = await models.HackerReview.create({
        hackerId: acceptableProfile.dataValues.userId,
        createdBy: req.user.id,
      });

      return res.json({
        review: newReview,
        profile: acceptableProfile,
      });
    } else {
      return res.json({ review: null, profile: null }); // Returns empty when there are no more profiles
    }
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

module.exports = router;
