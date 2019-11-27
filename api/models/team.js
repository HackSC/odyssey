module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      name: DataTypes.STRING(150),
      teamCode: {
        type: DataTypes.STRING(4),
        unique: true
      },
      ownerId: {
        type: DataTypes.STRING,
        references: {
          model: "HackerProfiles",
          key: "userId"
        }
      }
    },
    {}
  );
  Team.associate = function(models) {
    Team.hasMany(models.HackerProfile, { foreignKey: "teamId" });
  };
  return Team;
};
