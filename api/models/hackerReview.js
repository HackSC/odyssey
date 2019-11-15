module.exports = (sequelize, DataTypes) => {
  const HackerReview = sequelize.define(
    "HackerReview",
    {
      hackerId: DataTypes.STRING(100),
      createdBy: DataTypes.STRING(100),
      scoreOne: DataTypes.INTEGER,
      scoreTwo: DataTypes.INTEGER,
      scoreThree: DataTypes.INTEGER,
      comments: DataTypes.STRING
    },
    {}
  );
  HackerReview.associate = function(models) {
    // associations can be defined here
    models.HackerProfile.hasMany(HackerReview);
  };
  return HackerReview;
};
