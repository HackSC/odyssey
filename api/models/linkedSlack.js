module.exports = (sequelize, DataTypes) => {
  const LinkedSlack = sequelize.define(
    "LinkedSlack",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      slackId: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.STRING,
        references: {
          model: "HackerProfiles",
          key: "userId",
        },
      },
      devPostSubmission: {
        type: DataTypes.STRING,
      },
      checkInTime: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
    }
  );

  return LinkedSlack;
};
