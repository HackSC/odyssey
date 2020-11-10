const review = (sequelize, DataTypes) => {
  const HackerReview = sequelize.define(
    "HackerReview",
    {
      hackerId: DataTypes.STRING(100),
      createdBy: DataTypes.STRING(100),
      scoreOne: DataTypes.INTEGER,
      scoreTwo: DataTypes.INTEGER,
      scoreThree: DataTypes.INTEGER,
      comments: DataTypes.STRING,
    },
    {}
  );
  HackerReview.associate = (models) => {
    // associations can be defined here
    models.HackerProfile.hasMany(HackerReview, { foreignKey: "hackerId" });
    models.HackerReview.belongsTo(models.HackerProfile, {
      foreignKey: "createdBy",
    });
  };
  return HackerReview;
};

export default review;
