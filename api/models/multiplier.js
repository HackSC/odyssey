module.exports = (sequelize, DataTypes) => {
  const Multiplier = sequelize.define(
    "Multiplier",
    {
      personId: DataTypes.STRING(100),
      taskId: DataTypes.INTEGER
    },
    { tableName: "Contributions" }
  );
  Multiplier.associate = function(models) {
    Multiplier.belongsTo(models.Grouping);
  };
  return Multiplier;
};
