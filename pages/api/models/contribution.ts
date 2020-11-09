const contribution = (sequelize, DataTypes) => {
  const Contribution = sequelize.define(
    "Contribution",
    {
      personId: DataTypes.STRING(100),
      multiplier: DataTypes.INTEGER,
      scannerId: DataTypes.STRING(100),
      taskId: DataTypes.INTEGER,
    },
    {
      tableName: "Contributions",
    }
  );
  Contribution.associate = function (models) {
    Contribution.belongsTo(models.Person, {
      foreignKey: "personId",
      targetKey: "identityId",
    });
    Contribution.belongsTo(models.Task, { foreignKey: "taskId" });
    Contribution.addScope("defaultScope", {
      include: [{ model: models.Task }],
    });
  };
  return Contribution;
};

export default contribution;
