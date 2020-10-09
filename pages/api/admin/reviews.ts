const models = require("../models");
const { authMiddleware, requireAdmin } = require("../utils");
const Status = require("http-status-codes");

const query = async (req, res, next) => {
  authMiddleware(req, res, next);
  requireAdmin(req, res, next);

  if (req.method !== "GET") {
    return res.status(Status.BAD_REQUEST).send("");
  }

  try {
    const reviews = await models.HackerReview.findAll();
    return res.json({ reviews: reviews });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
};

export default query;
