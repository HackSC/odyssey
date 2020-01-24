module.exports = (sequelize, DataTypes) => {
  const Contribution = sequelize.define(
    "Contribution",
    {
      personId: DataTypes.STRING(100),
      multiplier: DataTypes.INTEGER,
      taskId: DataTypes.INTEGER
    },
    { tableName: "Contributions" }
  );
  Contribution.associate = function(models) {
    Contribution.belongsTo(models.Person, {
      foreignKey: "personId",
      targetKey: "identityId"
    });
    Contribution.belongsTo(models.Task);
  };
  return Contribution;
};
