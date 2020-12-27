"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface
        .changeColumn("HackerProfiles", "userId", {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        })
        //.then(() => queryInterface.addIndex('HackerProfiles', ['userId']))
        .then(() =>
          queryInterface.addColumn(
            "PendingTeammateRequests",
            "hackerProfileId",
            {
              type: Sequelize.STRING,
              references: {
                model: "HackerProfiles",
                key: "userId",
              },
            },
            {
              charset: "utf8mb4",
              collate: "utf8mb4_bin", // * New Databases: utf8mb4_0900_ai_ci
            }
          )
        )
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .changeColumn("HackerProfiles", "userId", {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      })
      .then(() =>
        queryInterface.removeColumn(
          "PendingTeammateRequests",
          "hackerProfileId"
        )
      );
  },
};
