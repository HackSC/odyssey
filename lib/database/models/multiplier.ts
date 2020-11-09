const multiplier = (sequelize, DataTypes) => {
  const Multiplier = sequelize.define(
    "Multiplier",
    {
      name: DataTypes.STRING,
      multiplierValue: DataTypes.INTEGER,
      groupingId: DataTypes.INTEGER
    },
    { tableName: "Multipliers" }
  );
  Multiplier.associate = function(models) {
    Multiplier.belongsTo(models.Grouping);
    models.Grouping.hasMany(Multiplier, { foreignKey: "groupingId" });
  };
  return Multiplier;
};

export default multiplier;
