module.exports = (sequelize, DataTypes) => {
  const HackerProfile = sequelize.define(
    "HackerProfile",
    {
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female", "other"]
      },
      ethnicity: DataTypes.STRING,
      email: DataTypes.STRING,
      major: DataTypes.STRING,
      minor: DataTypes.STRING,
      resume: DataTypes.STRING,
      skills: DataTypes.STRING,
      interests: DataTypes.STRING
    },
    {}
  );
  HackerProfile.associate = function(models) {
    // associations can be defined here
  };
  return HackerProfile;
};
