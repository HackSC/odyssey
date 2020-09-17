const team = (sequelize, DataTypes) => {
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
    Team.belongsTo(models.HackerProfile, {
      as: "owner",
      foreignKey: "ownerId",
      constraints: false
    });
    Team.hasMany(models.HackerProfile, {
      foreignKey: "teamId",
      constraints: false
    });
  };
  return Team;
};

export default team;
