"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("HackerProfiles", "id", {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("HackerProfiles", "id", {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ""
      })
    ]);
  }
};
