"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Judging",
      {
        id: {
          primaryKey: true,
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        judgeId: {
          allowNull: false,
          type: Sequelize.STRING,
          references: {
            model: "HackerProfiles",
            key: "userId",
          },
        },
        teamId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Teams",
            key: "id",
          },
        },
        vertical: {
          type: Sequelize.STRING,
        },
        notes: {
          type: Sequelize.STRING,
        },
        judged: {
          type: Sequelize.BOOLEAN,
        },
        score: {
          type: Sequelize.INTEGER,
        },
        startsAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        endsAt: {
          allowNull: false,
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
    return queryInterface.dropTable("Judging");
  },
};
