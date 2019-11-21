module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      name: DataTypes.STRING,
      teamId: {
        type: DataTypes.STRING(10),
        unique: true
      },
      ownerId: {
        type: DataTypes.STRING
      }
    },
    {}
  );
  Team.associate = function(models) {
    // associations can be defined here
  };
  return Team;
};
