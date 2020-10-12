const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();

router.use(utils.authMiddleware);

router.get("/", async (req, res) => {
  const apis = await models.Apis.findAll({
    include: [
      {
        model: models.ApiLinks,
        as: "links",
      },
    ],
  });

  return res.json({ apis });
});

module.exports = router;
