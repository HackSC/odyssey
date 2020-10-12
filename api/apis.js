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
        as: "ApiLink",
        where: { api_id: this.id }, //
      },
    ],
  });

  console.log(apis);

  // apis.map(api => {
  //   let api_obj = api;
  //   api_obj.links = await models.ApiLinks.findAll({
  //     where: {
  //       api_id: api.id,
  //     },
  //   });
  //   results = [...results, api_obj];
  // })

  // console.log(results)
  return res.json({ results });
});

module.exports = router;
