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
      devPostSubmission: {
        type: DataTypes.STRING,
      },
      checkInTime: {
        type: DataTypes.DATE,
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
