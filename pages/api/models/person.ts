const person = (sequelize, DataTypes) => {
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
          { model: sequelize.models.Contribution, as: "Contributions" },
          { model: sequelize.models.House, as: "Home" }
        ]
      }
    }
  );

  Person.associate = models => {
    Person.belongsTo(models.House, {
      foreignKey: "houseId",
      as: "Home",
      constraints: false
    });
    Person.belongsTo(models.ProjectTeam);
    Person.belongsTo(models.HackerProfile, {
      foreignKey: "identityId",
      targetKey: "userId",
      constraints: false,
      as: "Profile"
    });
    Person.hasMany(models.Contribution, { foreignKey: "personId" });
    Person.addScope("hideProfile", {
      include: [
        { model: sequelize.models.Contribution, as: "Contributions" },
        { model: sequelize.models.House, as: "Home" }
      ]
    });
  };

  return Person;
};

export default person;
