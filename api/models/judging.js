// If you make any changes to Judgment, make sure you do the following:
// 1) Generate a Sequelize migration that adds/removes columns as needed
// 2) Update the Judgment type definition in odyssey.d.ts
module.exports = (sequelize, DataTypes) => {
  const Judgment = sequelize.define(
    "Judgment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      judgeId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vertical: DataTypes.STRING,
      notes: DataTypes.STRING,
      judged: DataTypes.BOOLEAN,
      score: DataTypes.INTEGER,
      startsAt: DataTypes.DATE,
      endsAt: DataTypes.DATE,
    },
    {}
  );

  // * Associate
  Judgment.associate = function (models) {
    Judgment.belongsTo(models.HackerProfile, {
      as: "judge",
      foreignKey: "judgeId",
      constraints: false,
    });
    Judgment.belongsTo(models.Team, {
      as: "team",
      foreignKey: "teamId",
      constraints: false,
    });
  };

  return Judgment;
};
