const prize = (sequelize, DataTypes) => {
  const Prize = sequelize.define(
    "Prize",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  );
  Prize.associate = models => {
    Prize.belongsToMany(models.ProjectTeam, {
      through: "ProjectTeamPrizes",
      foreignKey: "prize",
      as: "Prizes",
      otherKey: "projectTeam"
    });
  };
  return Prize;
};

export default prize;
