"use strict";
// PendingTeammateRequests: Team Invites Someone to the Team
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "PendingTeammateRequests",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        teamId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Teams",
            key: "id",
          },
        },
        owner: {
          type: Sequelize.ENUM,
          values: ["team", "hacker"],
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_bin",
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("PendingTeammateRequests");
  },
};
