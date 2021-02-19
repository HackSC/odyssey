"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "HackathonConstants",
      "type",
      {
        type: Sequelize.ENUM,
        values: ["date", "boolean", "string"],
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_bin", // * New Databases: utf8mb4_0900_ai_ci
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("HackathonConstants", "type");
  },
};
