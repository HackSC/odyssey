const express = require("express");
const models = require("./models");
const utils = require("./utils");
const router = express.Router();
const Sentry = require("@sentry/node");
const Busboy = require("busboy");
const AWS = require("aws-sdk");
const scrapedin = require("scrapedin");

router.use(utils.authMiddleware);
router.use(utils.preprocessRequest);

router.get("/", async (req, res) => {
  const [hackerProfile] = await models.HackerProfile.findOrCreate({
    where: {
      userId: req.user.id,
    },
    defaults: {
      email: req.user._json.email,
      status: req.user._json.email_verified ? "verified" : "unverified",
    },
    include: [
      {
        model: models.Team,
        as: "team",
      },
    ],
  });

  hackerProfile.referred = await hackerProfile.getReferred();
  if (hackerProfile.status === "unverified" && req.user._json.email_verified) {
    // Update hacker profile
    try {
      hackerProfile.status = "verified";
      await hackerProfile.save();
      return res.json({ hackerProfile });
    } catch (exception) {
      return res.status(500).json({
        message: "Error trying to save profile",
        exception,
      });
    }
  }

  return res.json({ hackerProfile });
});

router.put("/", async (req, res) => {
  // Get the users current hacker profile
  const currentHackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id },
  });

  const formInput = req.body;

  // If the user is saving a profile, make sure that they have not already submitted one before
  if (currentHackerProfile.submittedAt !== null) {
    return res.status(400).json({
      error: "You have already submitted an application",
    });
  }

  // Only allow certain fields for form input
  const allowedFields = new Set([
    "gender",
    "ethnicity",
    "email",
    "major",
    "minor",
    "skills",
    "interests",
    "firstName",
    "resume",
    "lastName",
    "phoneNumber",
    "school",
    "year",
    "skillLevel",
    "graduationDate",
    "over18",
    "needBus",
    "links",
    "questionOne",
    "questionTwo",
    "questionThree",
    "codeOfConduct",
    "authorize",
    "marketing",
    "submit",
    "referrerCode",
  ]);

  for (let key of Object.keys(formInput)) {
    if (!allowedFields.has(key)) {
      return res.status(400).json({
        error: `${key} is not a supported field`,
      });
    }
  }

  // TODO: Validate inputs

  const updatedProfileFields = {
    ...formInput,
  };

  /*
    Advance the user in the application process if they meet the following conditions
    - Have previously not submitted a profile
    - Have filled out all of the required fields 
  */

  if (formInput.submit) {
    if (currentHackerProfile.submittedAt === null) {
      if (
        formInput.gender &&
        formInput.ethnicity &&
        formInput.major &&
        formInput.firstName &&
        formInput.lastName &&
        formInput.phoneNumber &&
        formInput.school &&
        formInput.skillLevel &&
        formInput.graduationDate &&
        formInput.over18 &&
        formInput.questionOne &&
        formInput.questionTwo &&
        formInput.questionThree &&
        formInput.codeOfConduct &&
        formInput.authorize
      ) {
        updatedProfileFields.submittedAt = new Date();
        updatedProfileFields.status = "submitted";
      } else {
        return res.status(400).json({
          error: "Not all required fields are filled out",
        });
      }
    }
  }

  // Update, then re-retrieve the updated hacker profile
  await models.HackerProfile.update(updatedProfileFields, {
    where: {
      userId: req.user.id,
    },
  });

  const updatedHackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id },
  });

  return res.json({ hackerProfile: updatedHackerProfile });
});

// Direct patch the referrerCode if there isn't one
router.put("/referrerCode", async (req, res) => {
  const referrerCode = req.body.referrerCode;

  const currentHackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id },
  });

  const currentReferrerCode = currentHackerProfile.referrerCode;

  if (!currentReferrerCode || currentReferrerCode == "") {
    const updatedFields = { referrerCode };

    await models.HackerProfile.update(updatedFields, {
      where: {
        userId: req.user.id,
      },
    });
  }

  return res.send();
});

router.get("/resume-check", utils.authMiddleware, async (req, res) => {
  const user_id = req.query.userid;

  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET,
  });

  const params = {
    Bucket: "hacksc-odyssey",
    Key: user_id,
  };

  await s3
    .headObject(params)
    .promise()
    .then(
      () => {
        res.status(200).json({ message: "User has a resume." });
      },
      (err) => {
        res.status(500).json({ message: "User has not uploaded a resume." });
      }
    );
});

router.get("/resume", utils.authMiddleware, async (req, res) => {
  const user_id = req.query.userid;

  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET,
  });

  const params = {
    Bucket: "hacksc-odyssey",
    Key: user_id,
  };

  await s3
    .headObject(params)
    .promise()
    .then(
      () => {
        try {
          res.attachment(user_id);
          var fileStream = s3.getObject(params).createReadStream();
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            `attachment; filename=${user_id}.pdf`
          );
          fileStream.pipe(res, { autoClose: true });
        } catch (e) {
          res.status(204).json({ message: "User has not uploaded a resume." });
        }
      },
      (err) => {
        res.status(204).json({ message: "User has not uploaded a resume." });
      }
    );
});

router.get("/resume-list", utils.authMiddleware, async (req, res) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET,
  });

  let complete_object = [];
  let error = null;

  const googleParams = {
    Bucket: "hacksc-odyssey",
    Prefix: "google",
    MaxKeys: 1000, // * Max is 1,000
  };

  const auth0Params = {
    Bucket: "hacksc-odyssey",
    Prefix: "auth0",
    MaxKeys: 1000, // * Max is 1,000
  };

  // https://stackoverflow.com/questions/42394429/aws-sdk-s3-best-way-to-list-all-keys-with-listobjectsv2
  const listAllKeys = (params, out = []) =>
    new Promise((resolve, reject) => {
      s3.listObjectsV2(params)
        .promise()
        .then(({ Contents, IsTruncated, NextContinuationToken }) => {
          out.push(...Contents);
          !IsTruncated
            ? resolve(out)
            : resolve(
                listAllKeys(
                  Object.assign(params, {
                    ContinuationToken: NextContinuationToken,
                  }),
                  out
                )
              );
        })
        .catch(reject);
    });

  const googleKeys = await listAllKeys(googleParams);
  const auth0Keys = await listAllKeys(auth0Params);

  if (googleKeys && auth0Keys) {
    res.status(200).json({ files: [...googleKeys, ...auth0Keys] });
  } else {
    res.status(400).json({ message: "problem fetching resumes from S3" });
  }
});

router.post("/resume", utils.authMiddleware, async (req, res) => {
  const user = req.user;
  if (req.files) {
    const file = req.files.file;
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET,
    });

    const params = {
      Bucket: "hacksc-odyssey",
      Key: user.id,
      Body: file.data,
      ACL: "public-read",
      ContentType: "application/pdf",
    };

    s3.upload(params, function (err, data) {
      if (!err) {
        models.HackerProfile.update(
          { resume: data.Location },
          {
            where: {
              userId: req.user.id,
            },
          }
        )
          .then((updatedProfile) => {
            res.json({ hackerProfileUpdate: updatedProfile });
          })
          .catch((e) => {
            res.status(500).json({ error: e });
          });
      } else {
        res.json(500, { message: "Failed to upload Resume" });
      }
    });
  }
});

// Confirmation and declination routes
router.post("/confirm", (req, res) => {
  const { body, files, user } = req;

  let data = null;
  if (
    // !!! THESE FIELDS EXCLUDED FROM CHECK SINCE HACKSC 2021 IS VIRTUAL
    // body["travelMethod"] &&
    // files &&
    // files["travelPlan"] &&
    body["shirtSize"] &&
    body["codeOfConduct"]
  ) {
    // All required fields are in the request body
    // const s3 = new AWS.S3({
    //   accessKeyId: process.env.S3_ACCESS_KEY,
    //   secretAccessKey: process.env.S3_SECRET,
    // });

    // const file = files.travelPlan;
    // const fileExtension = file.name.split(".").slice(-1)[0];

    // const params = {
    //   Bucket: "hacksc-odyssey",
    //   Key: "confirmation-proof/" + user.id + "." + fileExtension,
    //   Body: file.data,
    // };

    // s3.upload(params, function (err, data) {
    //if (!err) {
    // Create dietary restrictions string
    const dietaryRestrictions = [];
    if (body["dietaryRestrictions.vegetarian"] === "true")
      dietaryRestrictions.push("vegetarian");
    if (body["dietaryRestrictions.vegan"] === "true")
      dietaryRestrictions.push("vegan");
    if (body["dietaryRestrictions.halal"] === "true")
      dietaryRestrictions.push("halal");
    if (body["dietaryRestrictions.kosher"] === "true")
      dietaryRestrictions.push("kosher");
    if (body["dietaryRestrictions.nutAllergy"] === "true")
      dietaryRestrictions.push("nutAllergy");
    if (body["dietaryRestrictions.lactoseIntolerant"] === "true")
      dietaryRestrictions.push("lactoseIntolerant");
    if (body["dietaryRestrictions.glutenFree"] === "true")
      dietaryRestrictions.push("glutenFree");
    if (
      body["dietaryRestrictions.other"] &&
      body["dietaryRestrictions.other"].trim() !== ""
    )
      dietaryRestrictions.push(body["dietaryRestrictions.other"]);

    models.HackerProfile.update(
      {
        travelOrigin:
          body["travelOrigin"] && body["travelOrigin"] == "null"
            ? ""
            : body["travelOrigin"],
        travelMethod:
          body["travelMethod"] && body["travelMethod"] == "null"
            ? "other"
            : body["travelMethod"],
        shirtSize: body["shirtSize"],
        travelPlan: data ? data.Location : "",
        dietaryRestrictions: dietaryRestrictions.join(" "),
        confirmCodeOfConduct: body["codeOfConduct"] === "true" ? true : false,
        status: "confirmed",
        noBusCheck: body["noBusCheck"] === "true" ? true : false,
        confirmedAt: new Date(),
      },
      {
        where: {
          userId: req.user.id,
          status: "accepted",
        },
      }
    )
      .then((updatedProfile) => {
        res.json({ hackerProfileUpdate: updatedProfile });
      })
      .catch((e) => {
        res.status(500).json({ error: e });
      });
    // } else {
    //   res.json(500, { message: "Failed to upload confirmation proof" });
    // }
    //});
  } else {
    return res.json(500, {
      message: "Failed to confirm attendance, missing fields",
    });
  }
});

router.post("/decline", async (req, res) => {
  await models.HackerProfile.update(
    {
      status: "declined",
      declinedAt: new Date(),
    },
    {
      where: {
        userId: req.user.id,
        status: "accepted",
      },
    }
  );

  return res.json({
    message: "Successfully processed request to decline HackSC 2021 acceptance",
  });
});

router.post("/undecline", async (req, res) => {
  await models.HackerProfile.update(
    {
      status: "accepted",
      declinedAt: null,
    },
    {
      where: {
        userId: req.user.id,
        status: "declined",
      },
    }
  );

  return res.json({
    message:
      "Successfully processed request to un-decline HackSC 2021 acceptance",
  });
});

router.get("/list", utils.requireDevelopmentEnv, async (req, res) => {
  try {
    const profiles = await models.HackerProfile.findAll({ limit: 10 });
    return res.json({ profiles });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

// Change visibility
router.put("/visibility", async (req, res) => {
  const currentHackerProfile = await models.HackerProfile.findOne({
    where: { userId: req.user.id },
  });

  const lookingForTeam = currentHackerProfile.lookingForTeam;

  await models.HackerProfile.update(
    { lookingForTeam: !lookingForTeam },
    {
      where: {
        userId: req.user.id,
      },
    }
  );

  return res.send();
});

// Add portfolio url
router.put("/portfolio", async (req, res) => {
  let imageUrl;
  if (req.body.portfolioUrl.includes("https://www.linkedin.com/in/")) {
    try {
      const profileScraper = await scrapedin({
        email: process.env.LINKEDIN,
        password: process.env.LINKEDINPASS,
      });
      const profile = await profileScraper(formInput.portfolioUrl);
      imageUrl = profile.profile.imageurl;
    } catch (err) {
      imageUrl = null;
    }
  }
  if (!imageUrl) {
    imageUrl =
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
  }

  await models.HackerProfile.update(
    {
      portfolioUrl: req.body.portfolioUrl,
      profilePic: imageUrl,
    },
    {
      where: {
        userId: req.user.id,
      },
    }
  );

  return res.send();
});

router.put("/updateProfile", async (req, res) => {
  const formInput = req.body;

  let imageUrl;
  if (formInput.portfolioUrl.includes("https://www.linkedin.com/in/")) {
    try {
      const profileScraper = await scrapedin({
        email: process.env.LINKEDIN,
        password: process.env.LINKEDINPASS,
      });
      const profile = await profileScraper(formInput.portfolioUrl);
      imageUrl = profile.profile.imageurl;
    } catch (err) {
      imageUrl = null;
    }
  }
  if (!imageUrl) {
    imageUrl =
      "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
  }

  const updatedProfileFields = {
    ...formInput,
    profilePic: imageUrl,
  };

  // Update, then re-retrieve the updated hacker profile
  await models.HackerProfile.update(updatedProfileFields, {
    where: {
      userId: req.user.id,
    },
  });
  return res.send();
});

module.exports = router;
