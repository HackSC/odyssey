module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define(
    "House",
    {
      name: DataTypes.STRING(100),
      color: DataTypes.STRING(100),
    },
    { tableName: "Houses" }
  );
  House.associate = function (models) {
    House.hasMany(models.Person, {
      foreignKey: "houseId",
      as: "HouseMembers",
      constraints: false,
    });
  };

  return House;
};
