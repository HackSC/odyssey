const team = (sequelize, DataTypes) => {
  const ProjectTeam = sequelize.define(
    "ProjectTeam",
    {
      name: DataTypes.STRING,
      devpostLink: DataTypes.STRING,
      githubLink: DataTypes.STRING
    },
    {
      defaultScope: {
        include: [
          { model: sequelize.models.Prize, as: "Prizes" },
          { model: sequelize.models.Person, as: "Members" }
        ]
      }
    }
  );
  ProjectTeam.associate = models => {
    ProjectTeam.hasMany(models.Person, { as: "Members" });
    ProjectTeam.belongsToMany(models.Prize, {
      through: "ProjectTeamPrizes",
      foreignKey: "projectTeam",
      as: "Prizes",
      otherKey: "prize"
    });
  };
  return ProjectTeam;
};

export default team;
