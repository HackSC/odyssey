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
    },
    {
      timestamps: false,
    }
  );

  return LinkedSlack;
};
