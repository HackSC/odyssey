const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");
const Busboy = require("busboy");
const AWS = require("aws-sdk");

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

router.get("/", async (req, res) => {
  const [hackerProfile] = await models.HackerProfile.findOrCreate({
    where: {
      userId: req.user.id
    },
    defaults: {
      email: req.user._json.email
    }
  });

  return res.json({ hackerProfile });
});

router.put("/", async (req, res) => {
  // TODO: Do input validation
  const newHackerProfile = await models.HackerProfile.update(req.body, {
    where: {
      userId: req.user.id
    }
  });
  return res.json({ hackerProfile: newHackerProfile });
});

router.post("/resume", utils.authMiddleware, async (req, res) => {
  const user = req.user;
  var busboy = new Busboy({ headers: req.headers });
  busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
    // Do the S3 upload stuff
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET
    });

    const params = {
      Bucket: "hacksc-odyssey",
      Key: filename,
      Body: file
    };
    s3.upload(params, function(err, data) {
      if (!err) {
        res.json({ data });
      }
    });
  });
  busboy.on("finish", function() {});
  return req.pipe(busboy);
});

module.exports = router;
