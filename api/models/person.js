module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    "Person",
    {
      identityId: DataTypes.STRING(100),
      isBattlepassComplete: DataTypes.BOOLEAN
    },
    { tableName: "persons" }
  );
  Person.associate = function(models) {};
  Person.removeAttribute("id");
  return Person;
};
