module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    "Person",
    {
      identityId: { type: DataTypes.STRING(100), primaryKey: true },
      isBattlepassComplete: DataTypes.BOOLEAN
    },
    { tableName: "persons" }
  );

  Person.associate = function(models) {
    Person.belongsTo(models.House, { foreignKey: "houseId" });
    Person.belongsTo(models.ProjectTeam);
  };

  return Person;
};
