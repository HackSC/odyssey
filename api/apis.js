const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.requireAdmin);

router.get("/", async (req, res) => {
  const apis = await models.Apis.find({});

  api.links = await models.ApiLinks.find({
    where: {
      api_id: apis.id,
    },
  });

  return res.json({ apis });
});

module.exports = router;
