module.exports = (sequelize, DataTypes) => {
  const Contribution = sequelize.define(
    "Grouping",
    {
      name: DataTypes.STRING(100)
    },
    { tableName: "Groupings" }
  );
  Contribution.associate = function(models) {
    models.Tasks.belongsTo(models.Grouping);
  };
  return Contribution;
};
