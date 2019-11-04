// If you make any changes to HackerProfile, make sure you do the following:
// 1) Generate a Sequelize migration that adds/removes columns as needed
// 2) Update the Profile type definition in odyssey.d.ts
module.exports = (sequelize, DataTypes) => {
  const HackerProfile = sequelize.define(
    "HackerProfile",
    {
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female", "non-binary", "other", "no-say"]
      },
      userId: DataTypes.STRING,
      ethnicity: DataTypes.STRING,
      email: DataTypes.STRING,
      major: DataTypes.STRING,
      minor: DataTypes.STRING,
      resume: DataTypes.STRING,
      skills: DataTypes.STRING,
      interests: DataTypes.STRING,
      submittedAt: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM,
        values: [
          "unverified",
          "verified",
          "submitted",
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
        values: ["freshman", "sophomore", "junior", "senior", "graduate"]
      },
      skillLevel: {
        type: DataTypes.ENUM,
        values: ["beginner", "intermediate", "advanced"]
      },
      questionOne: DataTypes.STRING(1000),
      questionTwo: DataTypes.STRING(1000),
      questionThree: DataTypes.STRING(1000),
      role: {
        type: DataTypes.ENUM,
        values: ["hacker", "admin", "sponsor", "superadmin"],
        defaultValue: "hacker"
      },
      graduationDate: {
        type: DataTypes.ENUM,
        values: [
          "spring-2020",
          "fall-2020",
          "spring-2021",
          "fall-2021",
          "spring-2022",
          "fall-2022",
          "spring-2023",
          "fall-2023",
          "other"
        ]
      },
      over18: DataTypes.BOOLEAN,
      needBus: DataTypes.BOOLEAN,
      links: DataTypes.STRING(1000),
      codeOfConduct: DataTypes.BOOLEAN,
      authorize: DataTypes.BOOLEAN,
      marketing: DataTypes.STRING(100)
    },
    {}
  );
  HackerProfile.associate = function(models) {
    // associations can be defined here
  };
  return HackerProfile;
};
