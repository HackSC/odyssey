module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    "Person",
    {
      identityId: {
        type: DataTypes.STRING(100),
        primaryKey: true
      },
      isBattlepassComplete: DataTypes.BOOLEAN,
      ProjectTeamId: DataTypes.NUMBER
    },
    {
      tableName: "persons",
      defaultScope: {
        include: [
          { model: sequelize.models.HackerProfile, as: "Profile" },
          sequelize.models.Contribution,
          sequelize.models.House
        ]
      }
    }
  );

  Person.associate = function(models) {
    Person.belongsTo(models.House, { foreignKey: "houseId" });
    Person.belongsTo(models.ProjectTeam);
    Person.belongsTo(models.HackerProfile, {
      foreignKey: "identityId",
      targetKey: "userId",
      constraints: false,
      as: "Profile"
    });
    Person.hasMany(models.Contribution, { foreignKey: "personId" });
  };

  return Person;
};
