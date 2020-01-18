module.exports = (sequelize, DataTypes) => {
  const Grouping = sequelize.define(
    "Grouping",
    {
      name: DataTypes.STRING(100)
    },
    { tableName: "Groupings" }
  );
  Grouping.associate = function(models) {
    models.Task.belongsTo(models.Grouping);
  };
  return Grouping;
};
