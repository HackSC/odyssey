"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "HackathonConstants",
      {
        id: {
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        boolean: {
          type: Sequelize.BOOLEAN,
        },
        date: {
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
    return queryInterface.dropTable("HackathonConstants");
  },
};
