module.exports = (sequelize, DataTypes) => {
  const Grouping = sequelize.define(
    "Grouping",
    {
      name: DataTypes.STRING(100)
    },
    { tableName: "Groupings" }
  );
  Grouping.associate = function(models) {
    models.Task.belongsTo(models.Grouping, { foreignKey: "groupingId" });
    Grouping.hasMany(models.Task, { foreignKey: "groupingId" });
  };
  return Grouping;
};
