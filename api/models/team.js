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
      },
      lookingForTeammates: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: false
      },
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
    // junction table
    Team.belongsToMany(models.HackerProfile, { 
      through: 'PendingTeammateRequests', 
      foreignKey: 'teamId',
      otherKey: 'hackerProfileId'
    });
  };
  return Team;
};
