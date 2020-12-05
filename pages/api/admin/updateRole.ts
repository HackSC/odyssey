const models = require("../models");
const { authMiddleware, requireAdmin } = require("../utils");
const Status = require("http-status-codes");

const query = async (req, res, next) => {
  authMiddleware(req, res, next);
  requireAdmin(req, res, next);

  if (req.method !== "POST") {
    return res.status(Status.BAD_REQUEST).send("");
  }

  try {
    const { email, role } = req.body;
    const result = await models.HackerProfile.update(
      {
        role: role
      },
      {
        where: {
          email: email
        }
      }
    );

    return res.json({ success: result });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export default query;
