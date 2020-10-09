const models = require("../models");
const { authMiddleware, requireAdmin } = require("../utils");
const Status = require("http-status-codes");
const { sequelize } = require("../../../lib/database/models");

const query = async (req, res, next) => {
  authMiddleware(req, res, next);
  requireAdmin(req, res, next);

  if (req.method !== "GET") {
    return res.status(Status.BAD_REQUEST).send("");
  }

  try {
    const allProfiles = await models.HackerProfile.findAll({
      where: {
        submittedAt: {
          [sequelize.Op.not]: null
        }
      },
      include: [
        {
          model: models.HackerReview
        }
      ]
    });
    let filteredProfiles = allProfiles.filter(profile => {
      const reviewsByCurrUser = profile.HackerReviews.filter(review => {
        return review.dataValues.createdBy === req.user.id;
      });
      return reviewsByCurrUser.length === 0 && profile.HackerReviews.length < 1;
    });
    return res.json({
      eligibleReviews: filteredProfiles
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export default query;
