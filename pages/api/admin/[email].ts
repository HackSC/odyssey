const db = require("../../lib/db");
const escape = require("sql-template-strings");
const validator = require("email-validator");
const models = require("../models");
const Status = require("http-status-codes");
const { authMiddleware, requireAdmin } = require("../utils");

// Full write access to a user's hackerProfile
// Variable parameters in the foremost endpoint path restricts use to just this route.
// Consider changing route as to not use up all single-path put requests
const query = async (req, res, next) => {
  authMiddleware(req, res, next);
  requireAdmin(req, res, next);

  if (req.method !== "PUT") {
    return res.status(Status.BAD_REQUEST).send("");
  }
  const updatedhackerProfile = await models.HackerProfile.update(req.body, {
    where: {
      email: req.params.email
    }
  });
  return res.json({ hackerProfile: updatedhackerProfile });
};

export default query;
