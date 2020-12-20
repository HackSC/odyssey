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
        },
        owner: {
            type: DataTypes.ENUM, 
            values: ["team", "hacker"],
        }
      },
    );

    return PendingTeammateRequests;
  };
