const express = require("express");
const models = require("./models");
const router = express.Router();
const authMiddleware = require("./utils");
const Busboy = require("busboy");
const AWS = require("aws-sdk");

router.get("/", authMiddleware, async (req, res) => {
  const users = await models.User.findAll();
  return res.json({ users });
});

router.post("/", authMiddleware, async (req, res) => {
  let sessionUser = req.user;
  let user = await models.User.create({
    userId: sessionUser.id,
    email: sessionUser._json.email,
    status: "created",
    role: "hacker"
  });
  return res.json({ user });
});

router.get("/:id", authMiddleware, async (req, res) => {
  let user = await models.User.findByPk(req.param.id);
  return res.json({ user });
});

router.put("/:id", authMiddleware, async (req, res) => {
  const user = req.user;
  let newUser = await models.User.update(req.body, { where: user.id });
  return res.json({ user: newUser });
});

router.post("/resume", authMiddleware, async (req, res) => {
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
