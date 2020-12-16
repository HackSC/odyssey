module.exports = (sequelize, DataTypes) => {
    const PendingTeammateRequests = sequelize.define(
      "PendingTeammateRequests",
      {
        hackerProfileId: {
            type: DataTypes.STRING,
            references: {
                model: "HackerProfiles",
                key: "userId"
            }
        },
        teamId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Teams",
                key: "id"
            }
        }
      },
    );
    return PendingTeammateRequests;
  };
  