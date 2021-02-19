"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Announcements",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        img: {
          type: Sequelize.STRING,
        },
        from: {
          type: Sequelize.STRING,
        },
        text: {
          type: Sequelize.STRING,
        },
        target: {
          type: Sequelize.STRING,
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_bin", // * New Databases: utf8mb4_0900_ai_ci
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Announcements");
  },
};
