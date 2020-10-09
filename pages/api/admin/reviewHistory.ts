const models = require("../models");
const { authMiddleware, requireAdmin } = require("../utils");

const query = async (req, res, next) => {
  authMiddleware(req, res, next);
  requireAdmin(req, res, next);

  try {
    const reviews = await models.HackerReview.findAll({
      where: {
        createdBy: req.user.id
      }
    });
    return res.json({ reviews: reviews });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
};

export default query;
