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
      applicationSubmittedAt: DataTypes.DATE,
      profileSubmittedAt: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM,
        values: [
          "unverified",
          "verified",
          "profileSubmitted",
          "applicationSubmitted",
          "accepted",
          "waitlisted",
          "rejected",
          "confirmed",
          "checkedIn"
        ]
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      school: DataTypes.STRING,
      year: {
        type: DataTypes.ENUM,
        values: ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"]
      },
      skillLevel: {
        type: DataTypes.ENUM,
        values: ["Beginner", "Intermediate", "Advanced"]
      },
      questionOne: DataTypes.STRING(1000),
      questionTwo: DataTypes.STRING(1000),
      questionThree: DataTypes.STRING(1000)
    },
    {}
  );
  HackerProfile.associate = function(models) {
    // associations can be defined here
  };
  return HackerProfile;
};
