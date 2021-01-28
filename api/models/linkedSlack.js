module.exports = (sequelize, DataTypes) => {
  const LinkedSlack = sequelize.define(
    "LinkedSlack",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
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
    },
    {
      timestamps: false,
    }
  );

  return LinkedSlack;
};
