"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("LinkedSlacks", {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("LinkedSlacks");
  },
};
