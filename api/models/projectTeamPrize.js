"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProjectTeamPrizes = sequelize.define("ProjectTeamPrizes", {
    ProjectTeam: DataTypes.NUMBER,
    Prize: DataTypes.NUMBER,
  });
  return ProjectTeamPrizes;
};
