const models = require("../../models");
const { authMiddleware, requireAdmin } = require("../../utils");
const Status = require("http-status-codes");
const { sequelize } = require("../../../../lib/database/models");

const query = async (req, res, next) => {
  authMiddleware(req, res, next);
  requireAdmin(req, res, next);

  if (req.method === "POST") {
    try {
      const formBody = req.body;
      const newReview = await models.HackerReview.create({
        hackerId: formBody.userId,
        createdBy: req.user.id,
        scoreOne: formBody.scoreOne,
        scoreTwo: formBody.scoreTwo,
        scoreThree: formBody.scoreThree,
        comments: formBody.comments
      });

      return res.json({ newReview: newReview });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  } else if (req.method === "GET") {
    try {
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
        return profile.dataValues.reviewCount < 1;
      });
      if (acceptableProfile) {
        const newReview = await models.HackerReview.create({
          hackerId: acceptableProfile.dataValues.userId,
          createdBy: req.user.id
        });

        return res.json({
          review: newReview,
          profile: acceptableProfile
        });
      } else {
        return res.json({ review: null, profile: null }); // Returns empty when there are no more profiles
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ err: e });
    }
  } else {
    return res.status(Status.BAD_REQUEST).send("");
  }
};

export default query;
