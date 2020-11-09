const teamPrize = (sequelize, DataTypes) => {
  const ProjectTeamPrizes = sequelize.define("ProjectTeamPrizes", {
    ProjectTeam: DataTypes.NUMBER,
    Prize: DataTypes.NUMBER
  });
  return ProjectTeamPrizes;
};

export default teamPrize;
