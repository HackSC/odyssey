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
    var { count } = req.query;
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
      return reviewsByCurrUser.length === 0;
    });

    filteredProfiles.sort((profile_a, profile_b) => {
      return profile_a.HackerReviews.length > profile_b.HackerReviews.length
        ? -1
        : 1;
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
    var { count } = req.query;
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

    const anyProfile = await models.HackerProfile.findAll({
      include: [
        {
          model: models.HackerReview,
        },
      ],
    });

    let numHackerReviews = anyProfile.reduce(
      (acc, curr) => curr.HackerReviews.length + acc,
      0
    );
    let numHackers = allProfiles.filter(
      (temp_hacker) => temp_hacker.role === "hacker"
    ).length;
    let numAcceptedHackers = allProfiles.filter(
      (temp_hacker) =>
        (temp_hacker.status === "accepted" ||
          temp_hacker.status === "checkedIn") &&
        temp_hacker.role === "hacker"
    ).length;
    let numRejectedHackers = allProfiles.filter(
      (temp_hacker) =>
        temp_hacker.status === "rejected" && temp_hacker.role === "hacker"
    ).length;
    let numWaitlistedHackers = allProfiles.filter(
      (temp_hacker) =>
        temp_hacker.status === "waitlisted" && temp_hacker.role === "hacker"
    ).length;

    let filteredProfiles = allProfiles
      .filter((profile) => {
        return profile.HackerReviews.length > 0 && profile.role === "hacker";
      })
      .slice(0, count);

    let numReviewedProfiles = allProfiles.filter(
      (profile) => profile.HackerReviews.length > 0 && profile.role === "hacker"
    ).length;

    return res.json({
      reviewedProfiles: filteredProfiles,
      numReviewedProfiles: numReviewedProfiles,
      numAcceptedHackers: numAcceptedHackers,
      numRejectedHackers: numRejectedHackers,
      numWaitlistedHackers: numWaitlistedHackers,
      numHackerReviews: numHackerReviews,
      numHackers: numHackers,
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

router.post("/giveTickets", async (req, res) => {
  try {
    const { email, firstName, lastName, tickets: _amount } = req.body;
    if (!Number.isInteger(parseInt(_amount))) {
      return res.status(500).json({ error: "Invalid amount" });
    }

    const amount = parseInt(_amount);
    if (email) {
      const result = await models.HackerProfile.increment(
        {
          raffleTickets: amount,
        },
        {
          where: {
            email: email,
          },
        }
      );

      if (result[0][1] !== 1) {
        return res.status(500).json({ error: "doesnt exist/not found" });
      }

      return res.json({ success: result });
    } else if (firstName && lastName) {
      const result = await models.HackerProfile.increment(
        {
          raffleTickets: amount,
        },
        {
          where: {
            firstName: firstName,
            lastName: lastName,
          },
        }
      );

      if (result[0][1] !== 1) {
        return res.status(500).json({ error: "doesnt exist/not found" });
      }

      return res.json({ success: result });
    } else {
      return res.status(500).json({ error: "not enough args" });
    }
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

router.get("/hackerStatusStats", async (req, res) => {
  try {
    const checkedIn = await models.HackerProfile.findAll({
      where: {
        status: "checkedIn",
      },
    });
    const accepted = await models.HackerProfile.findAll({
      where: {
        status: "accepted",
      },
    });
    const waitlisted = await models.HackerProfile.findAll({
      where: {
        status: "waitlisted",
      },
    });
    const rejected = await models.HackerProfile.findAll({
      where: {
        status: "rejected",
      },
    });

    return res.json({
      checkedIn: checkedIn.length,
      accepted: accepted.length,
      waitlisted: waitlisted.length,
      rejected: rejected.length,
    });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

router.post("/batchCheckIn", async (req, res) => {
  const input = req.body.qrCodes;
  if (input.length % 2 === 1) {
    return res.status(500).json({
      error: ["invalid input: len(QR_Codes) !== len(hacker_emails)"],
      success: [],
    });
  }
  let errorMsg = [];
  let successMsg = [];
  let updatedRequestBody = "";
  for (let i = 0; i < input.length; i += 2) {
    if (input[i].length != 4) {
      errorMsg.push(input[i] + " is an invalid QR Code");
      updatedRequestBody += input[i] + " " + input[i + 1] + "\n";
    } else {
      const body = {
        qrCodeId: input[i].toUpperCase(),
        status: "checkedIn",
      };
      const hackerProfiles = await models.HackerProfile.findAll({
        where: {
          email: input[i + 1],
        },
      });
      const withQRCode = await models.HackerProfile.findAll({
        where: {
          qrCodeId: input[i].toUpperCase(),
        },
      });
      if (withQRCode.length > 0) {
        errorMsg.push(input[i] + " must be unique to the hacker");
        updatedRequestBody += input[i] + " " + input[i + 1] + "\n";
      } else if (hackerProfiles.length == 0) {
        errorMsg.push(input[i + 1] + " does not belong to a hacker");
        updatedRequestBody += input[i] + " " + input[i + 1] + "\n";
      } else if (hackerProfiles.length > 1) {
        errorMsg.push(
          input[i + 1] +
            " belongs to multiple hackers. Please use the Check In tool to select the correct hacker"
        );
        updatedRequestBody += input[i] + " " + input[i + 1] + "\n";
      } else {
        try {
          await models.HackerProfile.update(body, {
            where: {
              email: input[i + 1],
            },
          });
          successMsg.push(input[i + 1] + " successfully checked in");
        } catch (e) {
          errorMsg.push("Error checking in " + input[i + 1]);
          updatedRequestBody += input[i] + " " + input[i + 1] + "\n";
        }
      }
    }
  }
  return res.json({
    error: errorMsg,
    success: successMsg,
    updatedRequestBody: updatedRequestBody,
  });
});

module.exports = router;
