"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProjectTeam = sequelize.define(
    "ProjectTeam",
    {
      name: DataTypes.STRING,
      devpostLink: DataTypes.STRING,
      githubLink: DataTypes.STRING
    },
    {
      defaultScope: {
        include: [sequelize.models.Prize, sequelize.models.Person]
      }
    }
  );
  ProjectTeam.associate = function(models) {
    ProjectTeam.hasMany(models.Person);
    ProjectTeam.belongsToMany(models.Prize, {
      through: "ProjectTeamPrizes",
      foreignKey: "prize"
    });
  };
  return ProjectTeam;
};
