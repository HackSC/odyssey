"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "LinkedSlacks",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        slackId: {
          type: Sequelize.STRING,
        },
        userId: {
          type: Sequelize.STRING,
          references: {
            model: "HackerProfiles",
            key: "userId",
          },
        },
        devPostSubmission: {
          type: Sequelize.STRING,
        },
        checkInTime: {
          type: Sequelize.DATE,
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_bin", // * New Databases: utf8mb4_0900_ai_ci
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("LinkedSlacks");
  },
};
