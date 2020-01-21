module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    "Person",
    {
      identityId: DataTypes.STRING(100),
      isBattlepassComplete: DataTypes.BOOLEAN
    },
    { tableName: "persons" }
  );

  Person.associate = function(models) {
    Person.belongsTo(models.House, { foreignKey: "houseId" });
    Person.belongsTo(models.ProjectTeam);
  };

  Person.removeAttribute("id");
  return Person;
};
