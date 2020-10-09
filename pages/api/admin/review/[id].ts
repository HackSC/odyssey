const models = require("../../models");
const { authMiddleware, requireAdmin } = require("../../utils");

const query = async (req, res, next) => {
  authMiddleware(req, res, next);
  requireAdmin(req, res, next);

  const requestId = req.params.id;
  const allowedFields = new Set([
    "scoreOne",
    "scoreTwo",
    "scoreThree",
    "comments"
  ]);
  const formInput = req.body;

  for (let key of Object.keys(formInput)) {
    if (!allowedFields.has(key)) {
      return res.status(400).json({
        error: `${key} is not a supported field`
      });
    }
  }

  try {
    const result = await models.HackerReview.update(req.body, {
      where: {
        id: requestId
      }
    });

    return res.json({ update: result });
  } catch (e) {
    return res.status(500).json({
      error: e
    });
  }
};

export default query;
