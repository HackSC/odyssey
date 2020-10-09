const db = require("../../lib/db");
const escape = require("sql-template-strings");
const validator = require("email-validator");
const models = require("../models");

const query = async (req, res) => {
  const {
    query: { email, ip }
  } = req;
  let my_ip = ip;

  // * Check if email is injected SQL
  if (!validator.validate(email)) {
    return res
      .status(400)
      .json({ success: null, error: "Please input a valid email." });
  }

  if (!my_ip) my_ip = "0.0.0.0";

  const subs = await db.query(escape`
        SELECT *
        FROM profiles
        WHERE email=${email}
    `);

  if (subs.length > 0)
    return res
      .status(400)
      .json({ success: null, error: "Email already exists in the database." });

  const result = await db.query(escape`
        INSERT INTO signups (email, ip, created_at)
        VALUES (${email}, ${my_ip}, ${toSqlDatetime(new Date())})
    `);

  res.status(200).json({ success: email, error: null });
};

const toSqlDatetime = inputDate => {
  const date = new Date(inputDate);
  const dateWithOffest = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return dateWithOffest
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
};

export default query;

module.exports = async (req, res) => {
  try {
    const profilesWCount = await models.HackerProfile.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("HackerReviews.id")),
            "reviewCount"
          ]
        ]
      },
      include: [
        {
          model: models.HackerReview,
          attributes: []
        }
      ],
      group: ["HackerProfile.userId"]
    });

    const acceptableProfile = profilesWCount.find(profile => {
      return profile.dataValues.reviewCount < 1;
    });
    if (acceptableProfile) {
      const newReview = await models.HackerReview.create({
        hackerId: acceptableProfile.dataValues.userId,
        createdBy: req.user.id
      });

      return res.json({
        review: newReview,
        profile: acceptableProfile
      });
    } else {
      return res.json({ review: null, profile: null }); // Returns empty when there are no more profiles
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ err: e });
  }
};
