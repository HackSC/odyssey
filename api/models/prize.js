"use strict";
module.exports = (sequelize, DataTypes) => {
  const Prize = sequelize.define(
    "Prize",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  );
  Prize.associate = function(models) {
    Prize.belongsToMany(models.ProjectTeams, { through: "ProjectTeamPrizes" });
  };
  return Prize;
};
