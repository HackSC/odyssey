const models = require("../models");
const { authMiddleware, requireAdmin } = require("../utils");

const query = async (req, res, next) => {
  authMiddleware(req, res, next);
  requireAdmin(req, res, next);

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
