// @ts-nocheck
module.exports = async (req, res) => {
  try {
    const profilesWCount = await models.HackerProfile.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("HackerReviews.id")),
            "reviewCount",
          ],
        ],
      },
      include: [
        {
          model: models.HackerReview,
          attributes: [],
        },
      ],
      group: ["HackerProfile.userId"],
    });

    const acceptableProfile = profilesWCount.find((profile) => {
      return profile.dataValues.reviewCount < 1;
    });
    if (acceptableProfile) {
      const newReview = await models.HackerReview.create({
        hackerId: acceptableProfile.dataValues.userId,
        createdBy: req.user.id,
      });

      return res.json({
        review: newReview,
        profile: acceptableProfile,
      });
    } else {
      return res.json({ review: null, profile: null }); // Returns empty when there are no more profiles
    }
  } catch (e) {
    return res.status(500).json({ err: e });
  }
};

export default {};
