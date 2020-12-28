// If you make any changes to Judgment, make sure you do the following:
// 1) Generate a Sequelize migration that adds/removes columns as needed
// 2) Update the Judgment type definition in odyssey.d.ts
module.exports = (sequelize, DataTypes) => {
  const Judgings = sequelize.define(
    "Judgings",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
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
      zoomLink: DataTypes.STRING,
      sponsor: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  // * Associate
  Judgings.associate = function (models) {
    Judgings.belongsTo(models.HackerProfile, {
      as: "judge",
      foreignKey: "judgeId",
      constraints: false,
    });
    Judgings.belongsTo(models.Team, {
      as: "team",
      foreignKey: "teamId",
      constraints: false,
    });
  };

  return Judgings;
};
