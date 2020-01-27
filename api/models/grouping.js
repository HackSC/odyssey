module.exports = (sequelize, DataTypes) => {
  const Grouping = sequelize.define(
    "Grouping",
    {
      name: DataTypes.STRING(100)
    },
    {}
  );

  Grouping.associate = function(models) {
    Grouping.hasMany(Tasks, { foreignKey: "groupingId" });
  };
  return Grouping;
};
