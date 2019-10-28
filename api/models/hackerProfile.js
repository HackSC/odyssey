module.exports = (sequelize, DataTypes) => {
  const HackerProfile = sequelize.define(
    "HackerProfile",
    {
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female", "other"]
      },
      userId: DataTypes.STRING,
      ethnicity: DataTypes.STRING,
      email: DataTypes.STRING,
      major: DataTypes.STRING,
      minor: DataTypes.STRING,
      resume: DataTypes.STRING,
      skills: DataTypes.STRING,
      interests: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      year: DataTypes.STRING,
      skillLevel: {
        type: DataTypes.ENUM,
        values: ["beginner", "intermediate", "advanced", "expert"]
      },
    },
    {}
  );
  HackerProfile.associate = function(models) {
    // associations can be defined here
  };
  return HackerProfile;
};
