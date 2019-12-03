module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    "Person",
    {
      identityId: DataTypes.STRING(100),
      isBattlepassComplete: DataTypes.BOOLEAN
    },
    { tableName: "persons" }
  );
<<<<<<< HEAD
  Person.associate = function (models) {
    // TODO: Add Contribution assocs here
  };
=======
  Person.associate = function(models) {};
>>>>>>> init
  Person.removeAttribute("id");
  return Person;
};
