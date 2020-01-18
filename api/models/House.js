module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define(
    "House",
    {
      name: DataTypes.STRING(100),
      color: DataTypes.STRING(100)
    },
    { tableName: "Houses" }
  );
  House.associate = function(models) {
    models.Person.belongsTo(House);
    House.hasMany(models.Person, { foreignKey: "houseId" });
  };

  return House;
};
