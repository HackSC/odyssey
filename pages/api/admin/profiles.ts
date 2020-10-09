const models = require("../models");
const { sequelize } = require("../../../lib/database/models");
const { authMiddleware, requireAdmin } = require("../utils");
const Status = require("http-status-codes");

// TODO: use the new client fetcher api
const query = async (req, res, next) => {
  authMiddleware(req, res, next);
  requireAdmin(req, res, next);

  if (req.method !== "GET") {
    return res.status(Status.BAD_REQUEST).send("");
  }

  const Op = sequelize.Op;
  const { query } = req.query;
  const flexQuery = "%" + query + "%";
  try {
    const profiles = await models.HackerProfile.findAll({
      where: {
        [Op.or]: [
          {
            email: {
              [Op.like]: flexQuery
            }
          },
          {
            firstName: {
              [Op.like]: flexQuery
            }
          },
          {
            lastName: {
              [Op.like]: flexQuery
            }
          }
        ]
      },
      limit: 50
    });
    return res.json({
      profiles
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export default query;
