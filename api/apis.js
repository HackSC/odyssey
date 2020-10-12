const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);
router.use(utils.requireAdmin);

router.get("/", async (req, res) => {
  console.log("in apis route");
  const apis = await models.Apis.find();

  console.log(apis);

  api.links = await models.ApiLinks.find({
    where: {
      api_id: apis.id,
    },
  });

  return res.json({ apis });
});

module.exports = router;
