"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable("LinkedSlacks", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        slackId: {
          type: Sequelize.STRING,
        },
        devPostSubmission: {
          type: Sequelize.STRING,
        },
        checkInTime: {
          type: Sequelize.DATE,
        },
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.dropTable("LinkedSlacks")]);
  },
};
