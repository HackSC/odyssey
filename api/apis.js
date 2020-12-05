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

  return res.json({ success: apis });
});

router.get("/event", async (req, res) => {
  let id = parseInt(Object.keys(req.query)[0].split(",")[1]);
  const apis = await models.Apis.findAll({
    where: {
      major_event: id,
    },
    include: [
      {
        model: models.ApiLinks,
        as: "links",
      },
    ],
  });

  return res.json({ success: apis });
});

module.exports = router;
