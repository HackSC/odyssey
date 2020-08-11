// If you make any changes to HackerProfile, make sure you do the following:
// 1) Generate a Sequelize migration that adds/removes columns as needed
// 2) Update the Profile type definition in odyssey.d.ts
module.exports = (sequelize, DataTypes) => {
  const HackerProfile = sequelize.define(
    "HackerProfile",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: "hacker_id",
        allowNull: false
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female", "non-binary", "other", "no-say"]
      },
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      travelStatus: {
        type: DataTypes.ENUM,
        values: [
          "ineligible",
          "needed",
          "unneeded",
          "declined",
          "unknown",
          "submitted",
          "reimbursed"
        ]
      },
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
          "declined",
          "checkedIn"
        ],
        defaultValue: "unverified",
        allowNull: false
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
        values: ["hacker", "admin", "sponsor", "volunteer"],
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
      marketing: DataTypes.STRING(100),
      promoCode: {
        type: DataTypes.STRING(100),
        defaultValue: function() {
          //Random string of length 8
          return (Math.random().toString(36) + "00000000000000000").slice(
            2,
            10
          );
        }
      },
      referrerCode: DataTypes.STRING(100),
      referred: DataTypes.VIRTUAL,
      travelOrigin: DataTypes.STRING(500),
      travelMethod: {
        type: DataTypes.ENUM,
        values: ["driving", "bus", "flying", "usc", "other"]
      },
      shirtSize: {
        type: DataTypes.ENUM,
        values: ["xs", "s", "m", "l", "xl"]
      },
      travelPlan: DataTypes.STRING(500),
      dietaryRestrictions: DataTypes.STRING(1000),
      confirmCodeOfConduct: DataTypes.BOOLEAN,
      noBusCheck: DataTypes.BOOLEAN,
      confirmedAt: DataTypes.DATE,
      declinedAt: DataTypes.DATE,
      qrCodeId: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {}
  );

  HackerProfile.prototype.getReferred = function() {
    return sequelize.models.HackerProfile.findAll({
      where: {
        referrerCode: this.promoCode
      }
    });
  };
  HackerProfile.associate = function(models) {
    HackerProfile.belongsTo(models.Team, {
      as: "team",
      foreignKey: "teamId",
      constraints: false
    });
  };
  return HackerProfile;
};
