module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    "Person",
    {
      identityId: DataTypes.STRING(100),
      isBattlepassComplete: DataTypes.BOOLEAN
    },
    { tableName: "persons" }
  );
  Person.associate = function (models) {
    // TODO: Add Contribution assocs here
  };
  Person.removeAttribute("id");
  return Person;
};
